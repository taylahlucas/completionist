const express = require('express');
const router =  express.Router();
const { sendVerificationEmail, sendEmail } = require('../controllers/send_email');

router.post("/verify", sendVerificationEmail);
router.post("/send", sendEmail);

module.exports = router;