const mongoose = require('mongoose');
const {
	fallout3SettingsConfig,
  fallout4SettingsConfig,
	skyrimSettingsConfig,
	witcher3SettingsConfig
} = require('./initialUserData');

const initialGameData = {
	quests: [], 
	collectables: [], 
	miscellaneous: [], 
	locations: [], 
}

// TODO: Convert to Joi
const userSchema = new mongoose.Schema({
  userId: String,
	steamId: String,
	googleId: String,
  name: String,
  email: String,
  password: String,
  userAvatar: String,
	signup: {
		type: Object,
		default: {
			verification: true,
			selectPlan: false,
			selectGame: false
		}
	},
  subscription: {
    tier: String,
    changesLeft: Number,
    data: [
      {
        id: String,
        isActive: Boolean,
      }
    ]
  },
  settings: {
    lang: String,
    configs: [{
      id: String,
      isActive: Boolean,
    }]
  },
  data: {
    type: Object,
    default: {
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
      },
    }
  },
});

userSchema.path('subscription.tier').default('free');
userSchema.path('subscription.changesLeft').default(1);
userSchema.path('subscription.data').default([
	{ id: 'fallout3', isActive: false },
	{ id: 'fallout4', isActive: false },
  { id: 'skyrim', isActive: false },
	{ id: 'witcher3', isActive: false }
]);
userSchema.path('settings.lang').default('en');
userSchema.path('settings.configs').default([
  { id: 'disabledSections', isActive: true }
]);

module.exports = mongoose.model('User', userSchema);


// { id: '72850', title: 'Skyrim' }, 
// { id: '489830', title: 'Skyrim Special Edition' }, 
// { id: '611670', title: 'Skyrim VR' }

// { id: '377160', title: 'Fallout 4' },
// { id: '199943', title: 'Fallout 4 G.O.T.Y Edition' },
// { id: '611660', title: 'Fallout 4 VR' },

	// witcher3 complete collection: 124923