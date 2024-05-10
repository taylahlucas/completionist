const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUser, updateSignUp } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.patch("/update/:userId", updateUser);
router.patch("/signup/:userId", updateSignUp);

module.exports = router;