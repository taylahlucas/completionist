const express = require('express');
const router =  express.Router();
const { getSteamProfile, getSteamAchievements } = require('../controllers/steam');

router.get("/profile", getSteamProfile);
router.get("/achievements", getSteamAchievements);

module.exports = router;