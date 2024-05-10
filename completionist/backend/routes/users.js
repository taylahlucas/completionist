const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUser, verifyUser } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.patch("/update/:userId", updateUser);
router.patch("/verify/:userId", verifyUser);

module.exports = router;