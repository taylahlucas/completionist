const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUser, changePassword } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.patch("/update/:userId", updateUser);
router.patch("/update/pw/:userId", changePassword);

module.exports = router;