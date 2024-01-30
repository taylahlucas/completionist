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
      { id: 'skyrim', isActive: true },
      { id: 'fallout4', isActive: true }
    ]
  },
  settings: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      { id: 'completedItems', isActive: true },
      { id: 'disabledSections', isActive: true }
    ]
  },
  data: {
    type: Object,
    default: {
      skyrim: {
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [
          {
            "category": "",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "mainQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "factionQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "civilWar",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "daedricQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "dungeonQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "miscellaneousQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "bountyQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "globalQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "dawnguard",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "dragonborn",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "dragonPriestMasks",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "daedricArtefacts",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "bugInAJar",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "shouts",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "uniqueArmourSets",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "uniqueWeapons",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "shrines",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "stones",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "dawnguard",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "dragonborn",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "none",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "dawnguard",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "dragonborn",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "books",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "spellTomes",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "journals",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "dawnguard",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "dragonborn",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "hearthfire",
            "isActive": true,
            "section": "miscellaneous"
          }
        ]
      },
      fallout4: {
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [
          {
            "category": "",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "mainQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "factionQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "sideQuests",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "automatron",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "farHarbor",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "vaultTecWorkshop",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "nukaWorld",
            "isActive": true,
            "section": "quests"
          },
          {
            "category": "",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "bobbleheads",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "magazines",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "uniqueWeapons",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "uniqueArmour",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "powerArmour",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "farHarbor",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "nukaWorld",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "automatron",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "vaultTecWorkshop",
            "isActive": true,
            "section": "collectables"
          },
          {
            "category": "",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "none",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "farHarbor",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "nukaWorld",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "automatron",
            "isActive": true,
            "section": "locations"
          },
          {
            "category": "",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "holotapes",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "automatron",
            "isActive": true,
            "section": "miscellaneous"
          },
          {
            "category": "nukaWorld",
            "isActive": true,
            "section": "miscellaneous"
          }
        ]
      },
    }
  },
});

module.exports = mongoose.model('User', userSchema);