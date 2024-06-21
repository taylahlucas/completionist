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
		setUsername: false,
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

const getUserDataState = (state: MainState): GeneralData => {
	if (state.selectedGame) {
		return state.user.data[state.selectedGame];
	}
	return initialUser.data['skyrim'];
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
			state.selectedGameData = getUserDataState(state);
		},
		setWebSignInConfigured: (state, action) => {
			state.webSignInConfigured = action.payload;
		},
		setSelectedGameSettings: (state, action) => {
			state.selectedGameSettings = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			state.selectedGameData = getUserDataState(state);
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
				const userData = getUserDataState(state);
				userData.quests = action.payload;
				state.selectedGameData.quests = action.payload;
			}
		},
		setCompletedCollectables: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				const userData = getUserDataState(state);
				userData.collectables = action.payload;
				state.selectedGameData.collectables = action.payload;
			}
		},
		setCompletedLocations: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				const userData = getUserDataState(state);
				userData.locations = action.payload;
				state.selectedGameData.locations = action.payload;
			}
		},
		setCompletedMiscItems: (state, action) => {
			state.shouldUpdateUser = true;
			if (state.selectedGameData) {
				const userData = getUserDataState(state);
				userData.miscellaneous = action.payload;
				state.selectedGameData.miscellaneous = action.payload;
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