import {
  SettingsConfig,
  User,
  BadgeItem,
  ProgressItem,
} from '@utils/custom-interfaces';

export const userLoggedInMock: User = {
  userId: '123',
  username: 'TestUsername',
  email: 'test@gmail.com',
  pw: 'TestPw',
  signup: {
    verification: true,
    setUsername: true,
    selectGame: true,
  },
  settings: {
    lang: 'en',
    configs: [],
  },
  gameData: [],
};

// TODO: Fix
export const mockSettingsSections: SettingsConfig = {
  general: [
    {
      section: {
        id: 'quests',
        isActive: true,
      },
      categories: [
        {
          id: 'mainQuests',
          isActive: true,
        },
      ],
      dlc: [
        {
          id: 'dawnguard',
          isActive: true,
        },
      ],
    },
    {
      section: {
        id: 'categories',
        isActive: false,
      },
      categories: [
        {
          id: 'dragonPriestMasks',
          isActive: false,
        },
      ],
      dlc: [
        {
          id: 'dawnguard',
          isActive: false,
        },
      ],
    },
  ],
  dlc: [
    {
      id: 'dawnguard',
      isActive: true,
    },
  ],
};

export const mockBadges: BadgeItem[] = [
  {
    id: '1',
    title: 'Completed 100 quests',
    icon: 'icon1.png',
  },
  {
    id: '2',
    title: 'Completed 500 quests',
    icon: 'icon2.png',
  },
  {
    id: '3',
    title: 'Completed 1000 quests',
    icon: 'icon3.png',
  },
  {
    id: '4',
    title: 'Completed 100 quests',
    icon: 'icon1.png',
  },
  {
    id: '5',
    title: 'Completed 500 quests',
    icon: 'icon2.png',
  },
  {
    id: '6',
    title: 'Completed 1000 quests',
    icon: 'icon3.png',
  },
];

export const mockProgressData: ProgressItem[] = [
  {
    id: 'fallout3',
    data: [
      {
        id: 'quests',
        current: 300,
        total: 800,
      },
      {
        id: 'collectables',
        current: 200,
        total: 1011,
      },
      {
        id: 'locations',
        current: 800,
        total: 900,
      },
      {
        id: 'miscellaneous',
        current: 500,
        total: 800,
      },
    ],
  },
  {
    id: 'fallout4',
    data: [
      {
        id: 'quests',
        current: 200,
        total: 1000,
      },
      {
        id: 'collectables',
        current: 340,
        total: 1000,
      },
      {
        id: 'locations',
        current: 123,
        total: 200,
      },
      {
        id: 'miscellaneous',
        current: 50,
        total: 800,
      },
    ],
  },
];
