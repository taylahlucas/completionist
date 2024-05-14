const express = require('express');
const router =  express.Router();
const { checkUserExists, linkAndSignIn, signup, signin, forgotPw } = require('../controllers/auth');

router.post("/exists", checkUserExists);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/link", linkAndSignIn);
router.patch("/reset", forgotPw);

module.exports = router;