const {
	witcher3SettingsConfig
} = require('../models/initialUserData');

module.exports = {
	up: async (db) => {
		const witcher3Data = {
			appId: 292030,
			quests: [],
			collectables: [],
			miscellaneous: [],
			locations: [],
			settingsConfig: witcher3SettingsConfig
		};

    await db.collection('users').updateMany({}, {
      $set: {
        'data.witcher3': witcher3Data,
      },
      $addToSet: {
        'subscription.data': { id: 'witcher3', isActive: false },
      },
    });
	},

	down: async (db) => {
		// Rollback script if needed
    await db.collection('users').updateMany({}, {
      $unset: {
        'data.witcher3': '',
      },
      $pull: {
        'subscription.data': { id: 'witcher3' },
      },
    });
	}
};
