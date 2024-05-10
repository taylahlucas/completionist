import { createSlice } from '@reduxjs/toolkit';
import { ScreenEnum, UnauthorizedScreenEnum, GameKeyEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { GeneralData, User } from '@utils/CustomInterfaces';
import { AppStateStatus } from 'react-native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

export const initialGameData: GeneralData = {
	appId: '',
	quests: [],
	collectables: [],
	locations: [],
	miscellaneous: [],
	settingsConfig: {
		general: [],
		dlc: []
	}
}

export const initialUser: User = {
	...initialFormData,
	subscription: {
		tier: SubscriptionTypeEnum.FREE,
		changesLeft: 2,
		data: []
	},
	signup: {
		verification: false,
		selectPlan: false,
		selectGame: false
	},
	settings: {
		lang: 'en',
		configs: []
	},
	data: {
		fallout3: initialGameData,
		fallout4: initialGameData,
		skyrim: initialGameData,
		witcher3: initialGameData
	}
}

export interface MainState {
	readonly showSplashScreen: boolean;
	readonly appState?: AppStateStatus,
	readonly currentScreen?: ScreenEnum;
	readonly selectedGame?: GameKeyEnum;
	readonly selectedGameData?: GeneralData;
	readonly selectedGameSettings: GameKeyEnum;
	readonly webSignInConfigured: boolean;
	readonly user: User;
	readonly shouldUpdateUser: boolean;
	readonly searchValue: string;
}

export const initialState: MainState = {
	showSplashScreen: true,
	webSignInConfigured: false,
	currentScreen: UnauthorizedScreenEnum.Login,
	selectedGameSettings: GameKeyEnum.SKYRIM,
	user: initialUser,
	shouldUpdateUser: false,
	searchValue: ''
}

const slice = createSlice({
	name: 'main',
	initialState: initialState,
	reducers: {
		setShowSplashScreen: (state, action) => {
			state.showSplashScreen = action.payload;
		},
		setAppState: (state, action) => {
			state.appState = action.payload;
		},
		setCurrentScreen: (state, action) => {
			state.currentScreen = action.payload;
		},
		setSelectedGame: (state, action) => {
			state.selectedGame = action.payload;
			switch (state.selectedGame) {
				case GameKeyEnum.FALLOUT_3:
					state.selectedGameData = state.user.data.fallout3;
					break;
				case GameKeyEnum.FALLOUT_4:
					state.selectedGameData = state.user.data.fallout4;
					break;
				case GameKeyEnum.SKYRIM:
					state.selectedGameData = state.user.data.skyrim;
					break;
				case GameKeyEnum.WITCHER_3:
					state.selectedGameData = state.user.data.witcher3;
					break;
			}
		},
		setWebSignInConfigured: (state, action) => {
			state.webSignInConfigured = action.payload;
		},
		setSelectedGameSettings: (state, action) => {
			state.selectedGameSettings = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			switch (state.selectedGame) {
				case GameKeyEnum.FALLOUT_3:
					state.selectedGameData = state.user.data.fallout3;
				case GameKeyEnum.FALLOUT_4:
					state.selectedGameData = state.user.data.fallout4;
					break;
				case GameKeyEnum.SKYRIM:
					state.selectedGameData = state.user.data.skyrim;
					break;
				case GameKeyEnum.WITCHER_3:
					state.selectedGameData = state.user.data.witcher3;
					break;
			}
		},
		setShouldUpdateUser: (state, action) => {
			state.shouldUpdateUser = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setCompletedQuests: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				switch (state.selectedGame) {
					case GameKeyEnum.FALLOUT_3:
						state.user.data.fallout3.quests = action.payload;
					case GameKeyEnum.FALLOUT_4:
						state.user.data.fallout4.quests = action.payload;
						break;
					case GameKeyEnum.SKYRIM:
						state.user.data.skyrim.quests = action.payload;
						break;
					case GameKeyEnum.WITCHER_3:
						state.user.data.witcher3.quests = action.payload;
						break;
				}
			}
		},
		setCompletedCollectables: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				switch (state.selectedGame) {
					case GameKeyEnum.FALLOUT_3:
						state.user.data.fallout3.collectables = action.payload;
					case GameKeyEnum.FALLOUT_4:
						state.user.data.fallout4.collectables = action.payload;
						break;
					case GameKeyEnum.SKYRIM:
						state.user.data.skyrim.collectables = action.payload;
						break;
					case GameKeyEnum.WITCHER_3:
						state.user.data.witcher3.collectables = action.payload;
						break;
				}
			}
		},
		setCompletedLocations: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				switch (state.selectedGame) {
					case GameKeyEnum.FALLOUT_3:
						state.user.data.fallout3.locations = action.payload;
					case GameKeyEnum.FALLOUT_4:
						state.user.data.fallout4.locations = action.payload;
						break;
					case GameKeyEnum.SKYRIM:
						state.user.data.skyrim.locations = action.payload;
						break;
					case GameKeyEnum.WITCHER_3:
						state.user.data.witcher3.locations = action.payload;
						break;
				}
			}
		},
		setCompletedMiscItems: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				switch (state.selectedGame) {
					case GameKeyEnum.FALLOUT_3:
						state.user.data.fallout3.miscellaneous = action.payload;
					case GameKeyEnum.FALLOUT_4:
						state.user.data.fallout4.miscellaneous = action.payload;
						break;
					case GameKeyEnum.SKYRIM:
						state.user.data.skyrim.miscellaneous = action.payload;
						break;
					case GameKeyEnum.WITCHER_3:
						state.user.data.witcher3.miscellaneous = action.payload;
						break;
				}
			}
		},
		reset: (state) => {
			state.searchValue = initialState.searchValue;
		}
	}
});

export const {
	setShowSplashScreen,
	setAppState,
	setCurrentScreen,
	setSelectedGame,
	setSelectedGameSettings,
	setWebSignInConfigured,
	setUser,
	setShouldUpdateUser,
	setSearchValue,
	setCompletedQuests,
	setCompletedCollectables,
	setCompletedMiscItems,
	setCompletedLocations,
	reset
} = slice.actions;

export default slice.reducer;