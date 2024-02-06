const mongoose = require('mongoose');
const {
  skyrimSettingsConfig,
  fallout4SettingsConfig
} = require('./initialUserData');

const userSchema = new mongoose.Schema({
  userId: String,
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
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: skyrimSettingsConfig
      },
      fallout4: {
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: fallout4SettingsConfig
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