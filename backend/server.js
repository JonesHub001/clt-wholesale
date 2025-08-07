const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-signup-emails', async (req, res) => {
  const { firstName, lastName, email, phone, language, purchaseIntent, interests, other, agreeToPromotions } = req.body;

  // Log received data for debugging
  console.log('Received signup data:', req.body);

  try {
    // Send form info to your email
    const adminResult = await resend.emails.send({
      from: 'no-reply@amazonliquidation.sale',
      to: 'joneshub211@email.com',
      subject: 'New Signup Submission',
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Purchase Intent:</strong> ${purchaseIntent}</p>
        <p><strong>Interests:</strong> ${(interests || []).join(', ')}</p>
        <p><strong>Other:</strong> ${other}</p>
        <p><strong>Promotions:</strong> ${agreeToPromotions ? 'Yes' : 'No'}</p>
      `
    });
    console.log('Admin email result:', adminResult);

    // Send acknowledgment to user
    const userResult = await resend.emails.send({
      from: 'no-reply@amazonliquidation.sale',
      to: email,
      subject: 'Thank you for joining CLT Wholesale!',
      html: `
        <h2>Thank you, ${firstName}!</h2>
        <p>We received your signup. We'll be in touch soon with exclusive deals and updates.</p>
      `
    });
    console.log('User email result:', userResult);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).json({ error: 'Failed to send emails.', details: err.message || err });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
