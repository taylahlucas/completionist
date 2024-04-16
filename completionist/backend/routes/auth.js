const express = require('express');
const router =  express.Router();
const { checkUserExists, linkAndSignIn, signup, signin } = require('../controllers/auth');

router.post("/exists", checkUserExists);
router.post("/signup", signup);
router.post("/link", linkAndSignIn);
router.post("/signin", signin);
// TODO: Forgot password / reset password
module.exports = router;