const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUser, changePassword, deleteUser } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.patch("/update/:userId", updateUser);
router.patch("/update/pw/:userId", changePassword);
router.delete("/delete/:userId", deleteUser);

module.exports = router;