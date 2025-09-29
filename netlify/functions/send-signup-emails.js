import { Resend } from 'resend';

export async function handler(event) {
  try {
    const { firstName, lastName, email, phone, language, purchaseIntent, interests, other, agreeToPromotions } = JSON.parse(event.body);
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send form info to your email
    const adminResult = await resend.emails.send({
      from: 'no-reply@amazonliquidation.sale',
      to: 'deal.ctlwholesale@gmail.com',
      subject: 'New Signup Submission',
      html: `
      <!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  h2 {
    color: #1a202c;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 16px;
    margin-top: 0;
  }
  .section {
    margin-bottom: 24px;
  }
  .section h3 {
    color: #1a202c;
    font-size: 16px;
    margin-bottom: 8px;
  }
  .details-grid {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 8px;
  }
  .details-grid p {
    margin: 0;
    padding: 4px 0;
  }
  .label {
    font-weight: bold;
    color: #555555;
  }
</style>
</head>
<body>
  <div class="container">
    <h2>New VIP List Submission</h2>

    <div class="section">
      <h3>Contact Information</h3>
      <div class="details-grid">
        <p class="label">Name:</p>
        <p>${firstName} ${lastName}</p>
        <p class="label">Email:</p>
        <p>${email}</p>
        <p class="label">Phone:</p>
        <p>${phone}</p>
        <p class="label">Language:</p>
        <p>${language}</p>
      </div>
    </div>

    <div class="section">
      <h3>Submission Details</h3>
      <div class="details-grid">
        <p class="label">Purchase Intent:</p>
        <p>${purchaseIntent}</p>
        <p class="label">Interests:</p>
        <p>${(interests || []).join(', ')}</p>
        <p class="label">Other Notes:</p>
        <p>${other}</p>
        <p class="label">Agreed to Promotions:</p>
        <p>${agreeToPromotions ? 'Yes' : 'No'}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `
    });

    // Send acknowledgment to user
    const userResult = await resend.emails.send({
      from: 'no-reply@amazonliquidation.sale',
      to: email,
      subject: 'Thank you for joining CLT Wholesale!',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
          <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
            <h2 style="color: #1a202c;">Welcome to the VIP List, ${firstName}!</h2>
            <p style="font-size: 16px; color: #333;">
              We're thrilled to have you join our exclusive community at CLT Wholesale.
            </p>
            <p style="font-size: 16px; color: #333;">
              You're now set to receive early access to our best deals and updates. We'll be in touch soon with opportunities tailored to your interests in <strong>${(interests || []).join(', ') || 'your selected categories'}</strong>.
            </p>
            <p style="font-size: 16px; color: #333;">
              Our team is already on the lookout for exciting stock that matches your preferences.
            </p>
            <hr style="margin: 24px 0;">
            <p style="font-size: 15px; color: #333; margin-top: 32px;">
              Best regards,<br>
              The CLT Wholesale Team<br>
              <a href="mailto:deal.ctlwholesale@gmail.com" style="color: #1a73e8;">deal.ctlwholesale@gmail.com</a>
            </p>
            <p style="font-size: 13px; color: #888; margin-top: 16px;">
              &copy; ${new Date().getFullYear()} CLT Wholesale<br>
              If you have any questions, please don't hesitate to reply to this email.
            </p>
          </div>
        </div>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, adminResult, userResult })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send emails.', details: err.message || err })
    };
  }
};
