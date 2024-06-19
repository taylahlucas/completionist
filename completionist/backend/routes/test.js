const express = require('express');
const router =  express.Router();
const { getUser, addUser } = require('../controllers/test');

router.get("/getUser", getUser);
router.patch("/addUser", addUser);

module.exports = router;