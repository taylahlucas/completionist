const express = require('express');
const router =  express.Router();
const { getSteamAchievements } = require('../controllers/steam');

router.get("/achievements", getSteamAchievements);

module.exports = router;