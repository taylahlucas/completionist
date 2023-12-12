const express = require('express');
const router =  express.Router();
const { getUserById } = require('../controllers/users');

router.get('/users/:userId', getUserById);

module.exports = router;