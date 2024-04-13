const express = require('express');
const router =  express.Router();
const { checkUserExists, googleSignIn, signup, signin } = require('../controllers/auth');

router.post("/signup", signup);
router.post("/exists", checkUserExists);
router.post("/googleSignIn", googleSignIn);
router.post("/signin", signin);
// TODO: Forgot password / reset password
module.exports = router;