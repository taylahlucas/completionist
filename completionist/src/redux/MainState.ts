import { createSlice } from '@reduxjs/toolkit';
import { UnauthorizedScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import { ScreenEnumType } from '@utils/CustomTypes';
import { GameData, User } from '@utils/CustomInterfaces';
import { AppStateStatus } from 'react-native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

export const initialGameData: GameData = {
	id: GameKeyEnum.SKYRIM,
	appId: 0,
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
	signup: {
		verification: false,
		setUsername: false,
		selectGame: false
	},
	settings: {
		lang: 'en',
		configs: []
	},
	gameData: []
}

export interface MainState {
	readonly showSplashScreen: boolean;
	readonly appState?: AppStateStatus,
	readonly currentScreen?: ScreenEnumType;
	readonly selectedGame?: GameData;
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

const getUserDataState = (state: MainState): GameData => {
	if (state.selectedGame && state.user.gameData) {
			return state.user.gameData.find((game) => game.id === state.selectedGame?.id) ?? initialGameData;
	}
	return initialGameData;
};

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
		},
		setWebSignInConfigured: (state, action) => {
			state.webSignInConfigured = action.payload;
		},
		setSelectedGameSettings: (state, action) => {
			state.selectedGameSettings = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setShouldUpdateUser: (state, action) => {
			state.shouldUpdateUser = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setCompletedQuests: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGame) {
				const userData = getUserDataState(state);
				userData.quests = action.payload;
				state.selectedGame.quests = action.payload;
			}
		},
		setCompletedCollectables: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGame) {
				const userData = getUserDataState(state);
				userData.collectables = action.payload;
				state.selectedGame.collectables = action.payload;
			}
		},
		setCompletedLocations: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGame) {
				const userData = getUserDataState(state);
				userData.locations = action.payload;
				state.selectedGame.locations = action.payload;
			}
		},
		setCompletedMiscItems: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGame) {
				const userData = getUserDataState(state);
				userData.miscellaneous = action.payload;
				state.selectedGame.miscellaneous = action.payload;
			}
		},
		reset: (state) => {
			state.searchValue = initialState.searchValue;
			state.shouldUpdateUser = false;
			state.user = initialUser;
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