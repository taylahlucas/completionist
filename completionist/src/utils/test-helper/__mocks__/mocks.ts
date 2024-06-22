import { SettingsConfig, User, AchievementItem, BadgeItem, ProgressItem } from '@utils/CustomInterfaces';
import { initialUser } from '@redux/MainState';
import { GameKeyEnum } from '@utils/CustomEnums';

export const userMockInitial: User = {
	...initialUser,
	activeGames: [
		{
			id: GameKeyEnum.FALLOUT_3,
			isActive: false
		},
		{
			id: GameKeyEnum.FALLOUT_4,
			isActive: true
		},
		{
			id: GameKeyEnum.SKYRIM,
			isActive: true
		},
		{
			id: GameKeyEnum.WITCHER_3,
			isActive: false
		}
	]
}

export const useMockData: User = {
	...userMockInitial,
	gameData: {
		...userMockInitial.gameData,
	}
}

export const mockSettingsSections: SettingsConfig = {
	general: [
		{
			section: {
				id: 'quests',
				title: 'Quests',
				isActive: true,
			},
			categories: [
				{
					id: 'mainQuests',
					title: 'Main Quests',
					isActive: true,
				},
			],
			dlc: [
				{
					id: 'dawnguard',
					title: 'Dawnguard',
					isActive: true
				},
			],
		},
		{
			section: {
				id: 'categories',
				title: 'Categories',
				isActive: false,
			},
			categories: [
				{
					id: 'dragonPriestMasks',
					title: 'Dragon Priest Masks',
					isActive: false,
				},
			],
			dlc: [
				{
					id: 'dawnguard',
					title: 'Dawnguard',
					isActive: false
				},
			],
		}
	],
	dlc: [
		{
			id: 'dawnguard',
			title: 'Dawnguard',
			isActive: true
		},
	],
}

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
	}
];

export const mockProgressData: ProgressItem[] = [
	{
		id: 'fallout3',
		data: [
			{
				id: 'quests',
				current: 300,
				total: 800
			},
			{
				id: 'collectables',
				current: 200,
				total: 1011
			},
			{
				id: 'locations',
				current: 800,
				total: 900
			},
			{
				id: 'miscellaneous',
				current: 500,
				total: 800
			}
		]
	},
	{
		id: 'fallout4',
		data: [
			{
				id: 'quests',
				current: 200,
				total: 1000
			},
			{
				id: 'collectables',
				current: 340,
				total: 1000
			},
			{
				id: 'locations',
				current: 123,
				total: 200
			},
			{
				id: 'miscellaneous',
				current: 50,
				total: 800
			}
		]
	},
];