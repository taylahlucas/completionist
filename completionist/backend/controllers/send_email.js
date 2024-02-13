const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { from, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASSWORD
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from,
      to: process.env.GMAIL_SMTP_EMAIL,
      subject,
      text,
    });
    
    console.log('Email sent successfully');
    return res.status(200)
  } catch (error) {
    return res.status(error.status).json({ error: error.message  });
  }
}

module.exports = {
  sendEmail
}
