const express = require('express');
const router =  express.Router();
const { getUserByUserId, updateUserInfo, updateUserData } = require('../controllers/users');

router.get("/:userId", getUserByUserId);
router.post("/update/info", updateUserInfo);
router.post("/update/data", updateUserData);

module.exports = router;