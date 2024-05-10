const express = require('express');
const router =  express.Router();
const { checkUserExists, linkAndSignIn, signup, signin } = require('../controllers/auth');

router.post("/exists", checkUserExists);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/link", linkAndSignIn);
// TODO: Forgot password / reset password
module.exports = router;