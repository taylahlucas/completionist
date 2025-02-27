const express = require('express');
const router = express.Router();
const { getDataForGame } = require('../controllers/game_data');

router.get('/get', getDataForGame);

module.exports = router;
