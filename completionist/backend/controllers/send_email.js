const nodemailer = require('nodemailer');
const { response_code, loggerType, apiNames } = require('../utils/constants');
const authWrapper = require('../helpers/auth-wrapper');
const log = require('../helpers/logger');

const sendVerificationEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    log(loggerType.request, apiNames.sendVerificationEmail, { to, subject });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.GMAIL_SMTP_EMAIL,
      to: to,
      subject,
      text,
    });

    log(loggerType.success, apiNames.sendVerificationEmail);
    return res.status(response_code.SUCCESS).json({ ok: true });
  } catch (err) {
    log(loggerType.error, apiNames.sendVerificationEmail, { err });
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
  }
};

const sendEmail = authWrapper({
  authFunction: async (req, res) => {
    const { from, subject, text } = req.body;
    log(loggerType.request, apiNames.sendEmail, { to, subject });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    });
    // Send mail with defined transport object
    await transporter.sendMail({
      from,
      to: process.env.GMAIL_SMTP_EMAIL,
      subject,
      text,
    });

    log(loggerType.success, apiNames.sendEmail);
    return res.status(response_code.SUCCESS).json({ ok: true });
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.sendEmail, { err });
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
  },
});

module.exports = {
  sendVerificationEmail,
  sendEmail,
};
