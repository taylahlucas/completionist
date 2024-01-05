const express = require('express');
const router =  express.Router();
const { sendEmail } = require('../controllers/send_email');

router.post("/send", sendEmail);

module.exports = router;