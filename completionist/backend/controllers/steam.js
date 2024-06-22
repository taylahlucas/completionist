const axios = require('axios');
const cheerio = require('cheerio');
const checkAuthToken = require('../helpers/check_auth');
const response_codes = require('../helpers/response_codes');

const getSteamProfile = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
	if (isAuthorized) {
		try {
			const { steamId } = req.query;		
			const url = `https://steamcommunity.com/profiles/${steamId}`;

			const { data } = await axios.get(url);
			const $ = cheerio.load(data);

			if ($('#mainContents h2').text().trim()) {
				return res.status(response_codes.FAILURE).json('No Steam ID found.');
			}

			const profile = {
				steamId: steamId,
				username: $('.actual_persona_name').text().trim(),
				name: $('.header_real_name bdi').text().trim(),
				profileImg: $('.playerAvatarAutoSizeInner img').attr('src'),
				country: $('.header_real_name').contents().last().text().trim(),
				level: $('.friendPlayerLevelNum:first').text().trim()
			}

			return res.status(response_codes.SUCCESS).json(profile);
		} catch (error) {
			console.error('Error fetching achievements:', error);
			return res.status(response_codes.FAILURE).json(error.message);
		}
	}
};

const getSteamAchievements = async (req, res) => {
	console.log("GETTING ACHIEVEMENTS")
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
				const icon = $(element).find('.achieveImgHolder img').attr('src');

				achievements.push({ name, description, unlocked, icon });
			});

			return res.status(response_codes.SUCCESS).json(achievements);
		} catch (error) {
			console.error('Error fetching achievements:', error);
			return res.status(response_codes.FAILURE).json(error.message);
		}
	}
};

module.exports = { getSteamProfile, getSteamAchievements };