const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUser } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.patch("/update/:userId", updateUser);

module.exports = router;