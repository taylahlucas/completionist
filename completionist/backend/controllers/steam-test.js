const axios = require('axios');
const cheerio = require('cheerio');

const getSteamAchievements = async (steamID, gameID) => {
	try {
		// const url = `https://steamcommunity.com/profiles/765611982449 29042/stats/72850/achievements`;
		const url = `https://steamcommunity.com/profiles/76561198244929042`;
		const { data } = await axios.get(url);

		const $ = cheerio.load(data);
		const achievements = [];

		const steamName = $('.actual_persona_name').text().trim();
		const realName = $('.header_real_name bdi').text().trim();
		const profileImg = $('.playerAvatarAutoSizeInner img').attr('src');
		const country = $('.header_real_name').contents().last().text().trim();
		const countryFlag = $('.profile_flag').attr('src');
		const level = $('.friendPlayerLevelNum:first').text().trim();
		
	// $('.achieveRow').each((index, element) => {
	//   const name = $(element).find('.achieveTxt').find('h3').text().trim();
	//   const description = $(element).find('.achieveTxt').find('h5').text().trim();
	//   const unlocked = $(element).find('.achieveUnlockTime').length > 0;
	// 	const icon = $('.achieveImgHolder img').attr('src');

	//   achievements.push({ name, description, unlocked, icon });
	// });
	// $('.achieveRow').each((index, element) => {
	// 	const name = $(element).find('.achieveTxt').find('h3').text().trim();
	// 	const description = $(element).find('.achieveTxt').find('h5').text().trim();
	// 	const unlocked = $(element).find('.achieveUnlockTime').length > 0;
	// 	const icon = $('.achieveImgHolder img').attr('src');

	// 	achievements.push({ name, description, unlocked, icon });
	// });

	return achievements;
} catch (error) {
	console.error('Error fetching achievements:', error);
	return [];
}
};

// Usage example
const steamID = 'yourSteamID';
const gameID = 'yourGameID';

getSteamAchievements(steamID, gameID);
