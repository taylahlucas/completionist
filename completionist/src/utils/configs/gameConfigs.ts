import { GameKeyEnum } from "../CustomEnums";
import { GameData, SettingsConfig } from "../CustomInterfaces";

const eldenRingSettingsConfig = {
	general: [
		{
			section: {
				id: "quests",
				isActive: true
			},
			categories: [
				{
					id: "mainQuests",
					isActive: true
				},
			],
			dlc: [
				{
					"id": "shadowOfTheErdtree",
					"isActive": true
				},
			]
		},
		{
			section: {
				id: "collectables",
				isActive: true
			},
			categories: [
				{
					id: "legendaryWeapons",
					isActive: true
				},
				{
					id: "legendarySpiritAshes",
					isActive: true
				},
				{
					id: "armourSets",
					isActive: true
				},
			],
			dlc: [
				{
					id: "shadowOfTheErdtree",
					isActive: true
				},
			]
		},
		{
			section: {
				id: "locations",
				isActive: true
			},
			categories: [
				{
					id: "main",
					isActive: true
				}
			],
			dlc: [
				{
					id: "shadowOfTheErdtree",
					isActive: true
				},
			]
		},
		{
			section: {
				id: "miscellaneous",
				isActive: true
			},
			categories: [
				{
				  id: "legendarySpells",
					isActive: true
				},
				{
					id: "achievementBosses",
					isActive: true
				},
			],
			dlc: []
		}
	],
	dlc: [
		{
			id: "shadowOfTheErdtree",
			isActive: true
		},
	]
};

const fallout3SettingsConfig: SettingsConfig = {
  general: [
    {
      section: {
        id: "quests",
        isActive: true
      },
      categories: [
        {
          id: "tutorialQuests",
          isActive: true
        },
        {
          id: "mainQuests",
          isActive: true
        },
        {
          id: "sideQuests",
          isActive: true
        },
        {
          id: "unmarkedQuests",
          isActive: true
        },
        {
          id: "repeatableQuests",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "operationAnchorage",
          isActive: true
        },
        {
          id: "thePitt",
          isActive: true
        },
        {
          id: "brokenSteel",
          isActive: true
        },
        {
          id: "pointLookout",
          isActive: true
        },
        {
          id: "mothershipZeta",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "collectables",
        isActive: true
      },
      categories: [
        {
          id: "bobbleheads",
          isActive: true
        },
        {
          id: "uniqueWeapons",
          isActive: true
        },
        {
          id: "uniqueArmor",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "operationAnchorage",
          isActive: true
        },
        {
          id: "thePitt",
          isActive: true
        },
        {
          id: "brokenSteel",
          isActive: true
        },
        {
          id: "pointLookout",
          isActive: true
        },
        {
          id: "mothershipZeta",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "locations",
        isActive: true
      },
      categories: [
        {
          id: "main",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "operationAnchorage",
          isActive: true
        },
        {
          id: "thePitt",
          isActive: true
        },
        {
          id: "brokenSteel",
          isActive: true
        },
        {
          id: "pointLookout",
          isActive: true
        },
        {
          id: "mothershipZeta",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "miscellaneous",
        isActive: true
      },
      categories: [
        {
          id: "holotapes",
          isActive: true
        },
        {
          id: "notes",
          isActive: true
        },
        {
          id: "skillBooks",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "operationAnchorage",
          isActive: true
        },
        {
          id: "thePitt",
          isActive: true
        },
        {
          id: "brokenSteel",
          isActive: true
        },
        {
          id: "pointLookout",
          isActive: true
        },
        {
          id: "mothershipZeta",
          isActive: true
        }
      ]
    }
  ],
  dlc: [
    {
      id: "operationAnchorage",
      isActive: true
    },
    {
      id: "thePitt",
      isActive: true
    },
    {
      id: "brokenSteel",
      isActive: true
    },
    {
      id: "pointLookout",
      isActive: true
    },
    {
      id: "mothershipZeta",
      isActive: true
    }
  ]
};

const fallout4SettingsConfig: SettingsConfig = {
  general: [
    {
      section: {
        id: "quests",
        isActive: true
      },
      categories: [
        {
          id: "mainQuests",
          isActive: true
        },
        {
          id: "factionQuests",
          isActive: true
        },
        {
          id: "sideQuests",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "automatron",
          isActive: true
        },
        {
          id: "farHarbor",
          isActive: true
        },
        {
          id: "vaultTecWorkshop",
          isActive: true
        },
        {
          id: "nukaWorld",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "collectables",
        isActive: true
      },
      categories: [
        {
          id: "bobbleheads",
          isActive: true
        },
        {
          id: "magazines",
          isActive: true
        },
        {
          id: "uniqueWeapons",
          isActive: true
        },
        {
          id: "uniqueArmor",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "farHarbor",
          isActive: true
        },
        {
          id: "nukaWorld",
          isActive: true
        },
        {
          id: "automatron",
          isActive: true
        },
        {
          id: "vaultTecWorkshop",
          isActive: true
        }
      ]
    },
    {
			section: {
				id: "locations",
				isActive: true
			},
			categories: [
				{
					id: "main",
					isActive: true
				}
			],
			dlc: [
				{
					id: "farHarbor",
					isActive: true
				},
				{
					id: "nukaWorld",
					isActive: true
				},
				{
					id: "automatron",
					isActive: true
				}
			]
		},
    {
			section: {
				id: "miscellaneous",
				isActive: true
			},
			categories: [
				{
					"id": "holotapes",
					"isActive": true
				}
			],
			dlc: [
				{
					id: "automatron",
					isActive: true
				},
				{
					id: "nukaWorld",
					isActive: true
				}
			]
		}
  ],
  dlc: [
    {
      id: "farHarbor",
      isActive: true
    },
    {
      id: "nukaWorld",
      isActive: true
    },
    {
      id: "automatron",
      isActive: true
    },
    {
      id: "vaultTecWorkshop",
      isActive: true
    }
  ]
};

const skyrimSettingsConfig: SettingsConfig = {
  general: [
    {
      section: {
        id: "quests",
        isActive: true
      },
      categories: [
        {
          id: "mainQuests",
          isActive: true
        },
        {
          id: "factionQuests",
          isActive: true
        },
        {
          id: "civilWar",
          isActive: true
        },
        {
          id: "daedricQuests",
          isActive: true
        },
        {
          id: "dungeonQuests",
          isActive: true
        },
        {
          id: "miscellaneousQuests",
          isActive: true
        },
        {
          id: "bountyQuests",
          isActive: true
        },
        {
          id: "globalQuests",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "dawnguard",
          isActive: true
        },
        {
          id: "dragonborn",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "collectables",
        isActive: true
      },
      categories: [
        {
          id: "dragonPriestMasks",
          isActive: true
        },
        {
          id: "daedricArtefacts",
          isActive: true
        },
        {
          id: "bugInAJar",
          isActive: true
        },
        {
          id: "shouts",
          isActive: true
        },
        {
          id: "uniqueArmorSets",
          isActive: true
        },
        {
          id: "uniqueWeapons",
          isActive: true
        },
        {
          id: "shrines",
          isActive: true
        },
        {
          id: "stones",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "dawnguard",
          isActive: true
        },
        {
          id: "dragonborn",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "locations",
        isActive: true
      },
      categories: [
        {
          id: "main",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "dawnguard",
          isActive: true
        },
        {
          id: "dragonborn",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "miscellaneous",
        isActive: true
      },
      categories: [
        {
          id: "books",
          isActive: true
        },
        {
          id: "spellTomes",
          isActive: true
        },
        {
          id: "journals",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "dawnguard",
          isActive: true
        },
        {
          id: "dragonborn",
          isActive: true
        },
        {
          id: "hearthfire",
          isActive: true
        }
      ]
    }
  ],
  dlc: [
    {
      id: "dawnguard",
      isActive: true
    },
    {
      id: "dragonborn",
      isActive: true
    },
    {
      id: "hearthfire",
      isActive: true
    }
  ]
};

const witcher3SettingsConfig: SettingsConfig = {
  general: [
    {
      section: {
        id: "quests",
        isActive: true
      },
      categories: [
        {
          id: "mainQuests",
          isActive: true
        },
        {
          id: "secondaryQuests",
          isActive: true
        },
        {
          id: "contracts",
          isActive: true
        },
        {
          id: "treasureHunts",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "bloodAndWine",
          isActive: true
        },
        {
          id: "heartsOfStone",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "collectables",
        isActive: true
      },
      categories: [
        {
          id: "diagrams",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "bloodAndWine",
          isActive: true
        },
        {
          id: "heartsOfStone",
          isActive: true
        }
      ]
    },
    {
      section: {
        id: "locations",
        isActive: true
      },
      categories: [
        {
          id: "main",
          isActive: true
        }
      ],
      dlc: [
        {
          id: "bloodAndWine",
          isActive: true
        },
        {
          id: "heartsOfStone",
          isActive: true
        }
      ]
    }
  ],
  dlc: [
    {
      id: "bloodAndWine",
      isActive: true
    },
    {
      id: "heartsOfStone",
      isActive: true
    }
  ]
};

const initialGameData = {
	quests: [], 
	collectables: [], 
	miscellaneous: [], 
	locations: [], 
}

export const eldenRingGameData: GameData = {
  id: GameKeyEnum.ELDEN_RING,
  appId: 1245620,
  ...initialGameData,
  settingsConfig: eldenRingSettingsConfig
};

export const fallout3GameData: GameData = {
  id: GameKeyEnum.FALLOUT_3,
	appId: 22300,
	...initialGameData,
	settingsConfig: fallout3SettingsConfig
};

export const fallout4GameData: GameData = {
  id: GameKeyEnum.FALLOUT_4,
	appId: 377160,
	...initialGameData,
	settingsConfig: fallout4SettingsConfig
};

export const skyrimGameData: GameData = {
  id: GameKeyEnum.SKYRIM,
	appId: 72850,
	...initialGameData,
	settingsConfig: skyrimSettingsConfig
};

export const witcher3GameData: GameData = {
  id: GameKeyEnum.WITCHER_3,
	appId: 292030,
	...initialGameData,
	settingsConfig: witcher3SettingsConfig
};

export const allGameData: GameData[] = [
  eldenRingGameData,
  fallout3GameData,
  fallout4GameData,
  skyrimGameData,
  witcher3GameData,
]