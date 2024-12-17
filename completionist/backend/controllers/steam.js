const axios = require('axios');
const cheerio = require('cheerio');
const { response_code } = require('../helpers/response_code');
const authWrapper = require('../helpers/auth_wrapper');

const getSteamProfile = authWrapper({
  authFunction: async (req, res, token) => {
    const { steamId } = req.query;
    const url = `https://steamcommunity.com/profiles/${steamId}/`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    if ($('#mainContents h2').text().trim()) {
      return res.status(response_code.FAILURE).json('No Steam ID found.');
    }

    const profile = {
      steamId: steamId,
      username: $('.actual_persona_name').text().trim(),
      name: $('.header_real_name bdi').text().trim(),
      profileImg: $('.playerAvatarAutoSizeInner img').attr('src'),
      country: $('.header_real_name').contents().last().text().trim(),
      level: $('.friendPlayerLevelNum:first').text().trim(),
    };

    return res.status(response_code.SUCCESS).json({ profile, token });
  },
  onError: (res, error) => {
    console.error('Error fetching achievements:', error);
    return res.status(response_code.FAILURE).json(error.message);
  },
});

const getSteamAchievements = authWrapper({
  authFunction: async (req, res, token) => {
    const { steamId, gameId } = req.query;
    const url = `https://steamcommunity.com/profiles/${steamId}/stats/${gameId}/achievements`;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const achievements = [];
    let noOfLocked = 0;
    let errorFound = false;

    // Check permissions
    $('h3').each((_, element) => {
      if (
        $(element)
          .text()
          .trim()
          .includes('An error was encountered while processing your request')
      ) {
        errorFound = true;
      }
    });
    if (errorFound) {
      return res
        .status(response_code.SUCCESS)
        .json({ hasPermission: false, achievements: [], noOfLocked, token });
    } else {
      $('.achieveRow').each((_, element) => {
        const name = $(element).find('.achieveTxt').find('h3').text().trim();
        const description = $(element)
          .find('.achieveTxt')
          .find('h5')
          .text()
          .trim();
        const unlocked = $(element).find('.achieveUnlockTime').length > 0;
        const icon = $(element).find('.achieveImgHolder img').attr('src');

        achievements.push({ name, description, unlocked, icon });
      });
      // TODO: Return response if no access is available
      if (
        achievements[achievements.length - 1]?.name?.includes(
          'hidden achievements remaining',
        )
      ) {
        noOfLocked = parseInt(
          achievements[achievements.length - 1].name.split(
            'hidden achievements remaining',
          )[0],
        );
        achievements.pop();
      }
      return res
        .status(response_code.SUCCESS)
        .json({ hasPermission: true, achievements, noOfLocked, token });
    }
  },
  onError: (res, error) => {
    console.error('Error fetching achievements:', error);
    return res.status(response_code.FAILURE).json(error.message);
  },
});

module.exports = { getSteamProfile, getSteamAchievements };
