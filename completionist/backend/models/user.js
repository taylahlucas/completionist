const mongoose = require('mongoose');
const {
  skyrimSettingsConfig,
  fallout4SettingsConfig
} = require('./initialUserData');

const userSchema = new mongoose.Schema({
  userId: String,
	steamId: String,
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
      skyrim: {
				appId: 72850,
        quests: [], 
        collectables: [], 
        miscellaneous: [], 
        locations: [], 
        settingsConfig: skyrimSettingsConfig
      },
      fallout4: {
				appId: 377160,
        quests: [], 
        collectables: [], 
        miscellaneous: [], 
        locations: [], 
        settingsConfig: fallout4SettingsConfig
      },
    }
  },
});

userSchema.path('subscription.tier').default('bronze');
userSchema.path('subscription.changesLeft').default(0);
userSchema.path('subscription.data').default([
  { id: 'skyrim', isActive: true },
  { id: 'fallout4', isActive: true }
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