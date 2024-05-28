const axios = require('axios');
const cheerio = require('cheerio');
const checkAuthToken = require('../helpers/check_auth');
const request_codes = require('../helpers/request_codes');

const getSteamAchievements = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
	if (isAuthorized) {
		try {
			const { steamId, gameId } = req.query;
			const url = `https://steamcommunity.com/profiles/${steamId}/stats/${gameId}/achievements`;
			const { data } = await axios.get(url);

			const $ = cheerio.load(data);
			const achievements = [];

			 $('.achieveRow').each((_, element) => {
				const name = $(element).find('.achieveTxt').find('h3').text().trim();
				const description = $(element).find('.achieveTxt').find('h5').text().trim();
				const unlocked = $(element).find('.achieveUnlockTime').length > 0;
				const icon = $('.achieveImgHolder img').attr('src');

				achievements.push({ name, description, unlocked, icon });
			});

			return res.status(request_codes.SUCCESS).json(achievements);
		} catch (error) {
			console.error('Error fetching achievements:', error);
			return res.status(request_codes.FAILURE).json(error.message);
		}
	}
};

module.exports = { getSteamAchievements };