const nodemailer = require('nodemailer');
const request_codes = require('../helpers/request_codes');

const sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASSWORD
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.GMAIL_SMTP_EMAIL,
      to: to,
      subject,
      text,
    });
    
    console.log('Email sent successfully');
    return res.status(request_codes.SUCCESS).json({ ok: true });
  } catch (error) {
    return res.status(error.status).json({ error: error.message  });
  }
}

module.exports = {
  sendEmail
}
