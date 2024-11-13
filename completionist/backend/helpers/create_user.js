const {
	eldenRingSettingsConfig,
  fallout3SettingsConfig,
  fallout4SettingsConfig,
  skyrimSettingsConfig,
  witcher3SettingsConfig
} = require('../models/initialUserData');

const defaultActiveGames = [
	{ id: 'eldenRing', isActive: false },
  { id: 'fallout3', isActive: false },
  { id: 'fallout4', isActive: false },
  { id: 'skyrim', isActive: false },
  { id: 'witcher3', isActive: false }
];

const initialGameData = {
	quests: [], 
	collectables: [], 
	miscellaneous: [], 
	locations: [], 
}

const defaultSettingsConfig = [
  { id: 'disabledSections', isActive: true }
];

const defaultSettings = {
	lang: "en",
	configs: defaultSettingsConfig
}

const defaultSignup = {
	verification: true,
	setUsername: false,
	selectGame: false
}

const defaultGameData = {
	eldenRing: {
		appId: 1245620,
		...initialGameData,
		settingsConfig: eldenRingSettingsConfig
	},
	fallout3: {
		appId: 22300,
		...initialGameData,
		settingsConfig: fallout3SettingsConfig
	},
	fallout4: {
		appId: 377160,
		...initialGameData,
		settingsConfig: fallout4SettingsConfig
	},
	skyrim: {
		appId: 72850,
		...initialGameData,
		settingsConfig: skyrimSettingsConfig
	},
	witcher3: {
		appId: 292030,
		...initialGameData,
		settingsConfig: witcher3SettingsConfig
	}
}

const createUser = (user) => {
	return {
		...user,
		signup: defaultSignup,
		activeGames: defaultActiveGames,
		settings: defaultSettings,
		gameData: defaultGameData
	}
};

module.exports = createUser;