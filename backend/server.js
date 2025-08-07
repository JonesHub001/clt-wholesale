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
      to: 'deal.ctlwholesale@gmail.com',
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
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
          <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
            <h2 style="color: #1a202c;">Thank you, ${firstName}!</h2>
            <p style="font-size: 16px; color: #333;">
              We're excited to have you on our VIP list at CLT Wholesale.<br>
              Based on your interests, you'll soon receive exclusive information and updates about stock related to <strong>${(interests || []).join(', ') || 'your selected categories'}</strong> and more.<br>
              Our team will reach out with the latest deals and opportunities tailored just for you.
            </p>
            <hr style="margin: 24px 0;">
           
            <p style="font-size: 15px; color: #333; margin-top: 32px;">
              Best regards,<br>
              The CLT Wholesale Team<br>
              <a href="mailto:deal.ctlwholesale@gmail.com" style="color: #1a73e8;">deal.ctlwholesale@gmail.com</a>
            </p>
            <p style="font-size: 13px; color: #888; margin-top: 16px;">
              &copy; ${new Date().getFullYear()} CLT Wholesale<br>
              If you have any questions, just reply to this email.
            </p>
          </div>
        </div>
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
