const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUserData } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.post("/update", updateUserData);

module.exports = router;