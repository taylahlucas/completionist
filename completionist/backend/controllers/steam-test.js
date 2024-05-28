const axios = require('axios');
const cheerio = require('cheerio');

const getSteamAchievements = async (steamID, gameID) => {
  try {
    const url = `https://steamcommunity.com/profiles/7656 1198 2449 2904 2/stats/72850/achievements`;
    const { data } = await axios.get(url);
=
    const $ = cheerio.load(data);
    const achievements = [];

    $('.achieveRow').each((index, element) => {
      const name = $(element).find('.achieveTxt').find('h3').text().trim();
      const description = $(element).find('.achieveTxt').find('h5').text().trim();
      const unlocked = $(element).find('.achieveUnlockTime').length > 0;
			const icon = $('.achieveImgHolder img').attr('src');

      achievements.push({ name, description, unlocked, icon });
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

// Usage example
const steamID = 'yourSteamID';
const gameID = 'yourGameID';

getSteamAchievements(steamID, gameID).then(achievements => {
  console.log('Achievements:', achievements);
});
