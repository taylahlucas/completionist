const nodemailer = require('nodemailer');
const { response_code } = require('../helpers/response_code');
const checkAuthToken = require('../helpers/check_auth');

const sendVerificationEmail = async (req, res) => {
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
    
    console.log('Verification Email sent successfully');
    return res.status(response_code.SUCCESS).json({ ok: true });
  } catch (error) {
    return res.status(error.status).json({ error: error.message  });
  }
}


const sendEmail = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
	if (isAuthorized) {
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
			return res.status(response_code.SUCCESS).json({ ok: true });
		} catch (error) {
			return res.status(error.status).json({ error: error.message  });
		}
	}
}

module.exports = {
	sendVerificationEmail,
  sendEmail
}
