const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  userAvatar: String,
  subscription: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      // TODO: Change this when adding subscription. Only add previously purchased/subscribed games
      { id: 'Skyrim', key: 'skyrim', isActive: true },
      { id: 'Fallout 4', key: 'fallout4', isActive: true }
    ]
  },
  settings: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      { id: 'Completed Items', isActive: true },
      { id: 'Disabled Sections', isActive: true }
    ]
  },
  data: {
    type: Object,
    default: {
      skyrim: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [{ "category": "", "isActive": true, "section": "Quests" }, { "category": "Main Quests", "isActive": true, "section": "Quests" }, { "category": "Faction Quests", "isActive": true, "section": "Quests" }, { "category": "Civil War", "isActive": true, "section": "Quests" }, { "category": "Daedric Quests", "isActive": true, "section": "Quests" }, { "category": "Dungeon Quests", "isActive": true, "section": "Quests" }, { "category": "Miscellaneous Quests", "isActive": true, "section": "Quests" }, { "category": "Bounty Quests", "isActive": true, "section": "Quests" }, { "category": "Global Quests", "isActive": true, "section": "Quests" }, { "category": "Dawnguard", "isActive": true, "section": "Quests" }, { "category": "Dragonborn", "isActive": true, "section": "Quests" }, { "category": "", "isActive": true, "section": "Collectables" }, { "category": "Dragon Priest Masks", "isActive": true, "section": "Collectables" }, { "category": "Daedric Artefacts", "isActive": true, "section": "Collectables" }, { "category": "Bug in a Jar", "isActive": true, "section": "Collectables" }, { "category": "Shouts", "isActive": true, "section": "Collectables" }, { "category": "Unique Armour Sets", "isActive": true, "section": "Collectables" }, { "category": "Unique Weapons", "isActive": true, "section": "Collectables" }, { "category": "Shrines", "isActive": true, "section": "Collectables" }, { "category": "Stones", "isActive": true, "section": "Collectables" }, { "category": "Dawnguard", "isActive": true, "section": "Collectables" }, { "category": "Dragonborn", "isActive": true, "section": "Collectables" }, { "category": "", "isActive": true, "section": "Locations" }, { "category": "None", "isActive": true, "section": "Locations" }, { "category": "Dawnguard", "isActive": true, "section": "Locations" }, { "category": "Dragonborn", "isActive": true, "section": "Locations" }, { "category": "", "isActive": true, "section": "Miscellaneous" }, { "category": "Books", "isActive": true, "section": "Miscellaneous" }, { "category": "Spell Tomes", "isActive": true, "section": "Miscellaneous" }, { "category": "Journals", "isActive": true, "section": "Miscellaneous" }, { "category": "Dawnguard", "isActive": true, "section": "Miscellaneous" }, { "category": "Dragonborn", "isActive": true, "section": "Miscellaneous" }, { "category": "Hearthfire", "isActive": true, "section": "Miscellaneous" }] },
      fallout4: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [{ "category": "", "isActive": true, "section": "Quests" }, { "category": "Main Quests", "isActive": true, "section": "Quests" }, { "category": "Faction Quests", "isActive": true, "section": "Quests" }, { "category": "Side Quests", "isActive": true, "section": "Quests" }, { "category": "Automatron", "isActive": true, "section": "Quests" }, { "category": "Far Harbor", "isActive": true, "section": "Quests" }, { "category": "Vault-Tec Workshop", "isActive": true, "section": "Quests" }, { "category": "Nuka-World", "isActive": true, "section": "Quests" }, { "category": "", "isActive": true, "section": "Collectables" }, { "category": "Bobbleheads", "isActive": true, "section": "Collectables" }, { "category": "Magazines", "isActive": true, "section": "Collectables" }, { "category": "Unique Weapons", "isActive": true, "section": "Collectables" }, { "category": "Unique Armour", "isActive": true, "section": "Collectables" }, { "category": "Power Armour", "isActive": true, "section": "Collectables" }, { "category": "Far Harbor", "isActive": true, "section": "Collectables" }, { "category": "Nuka-World", "isActive": true, "section": "Collectables" }, { "category": "Automatron", "isActive": true, "section": "Collectables" }, { "category": "Vault-Tech Workshop", "isActive": true, "section": "Collectables" }, { "category": "", "isActive": true, "section": "Locations" }, { "category": "None", "isActive": true, "section": "Locations" }, { "category": "Far Harbor", "isActive": true, "section": "Locations" }, { "category": "Nuka-World", "isActive": true, "section": "Locations" }, { "category": "Automatron", "isActive": true, "section": "Locations" }, { "category": "", "isActive": true, "section": "Miscellaneous" }, { "category": "Holotapes", "isActive": true, "section": "Miscellaneous" }, { "category": "Automatron", "isActive": true, "section": "Miscellaneous" }, { "category": "Nuka-World", "isActive": true, "section": "Miscellaneous" }] },
    }
  },
});

module.exports = mongoose.model('User', userSchema);