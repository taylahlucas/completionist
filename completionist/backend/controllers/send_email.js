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
  } catch (error) {
    console.log("Error sending email: ", error);
  }
}

module.exports = {
  sendEmail
}
