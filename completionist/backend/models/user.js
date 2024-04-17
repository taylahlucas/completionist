const mongoose = require('mongoose');
const {
  skyrimSettingsConfig,
  fallout4SettingsConfig,
	witcher3SettingsConfig
} = require('./initialUserData');

const initialGameData = {
	quests: [], 
	collectables: [], 
	miscellaneous: [], 
	locations: [], 
}

const userSchema = new mongoose.Schema({
  userId: String,
	steamId: String,
	googleId: String,
  name: String,
  email: String,
  password: String,
  userAvatar: String,
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
userSchema.path('subscription.changesLeft').default(2);
userSchema.path('subscription.data').default([
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