import { SettingsConfig, User } from '@utils/CustomInterfaces';
import { initialUser } from '@redux/MainState';
import { GameKeyEnum } from '@utils/CustomEnums';

export const userMockInitial: User = {
	...initialUser,
	subscription: {
		...initialUser.subscription,
		data: [
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
}

export const useMockData: User = {
	...userMockInitial,
	data: {
		...userMockInitial.data,
		// skyrim: [],
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