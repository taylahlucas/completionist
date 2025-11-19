import { AppStateStatus } from 'react-native';
import { createSlice } from '@reduxjs/toolkit';
import {
  UnAuthorizedScreenEnum,
  GameKeyEnum,
  PaymentTierEnum,
} from '@utils/custom-enums';
import { GameData, User, ScreenEnumType, LoginFormData } from '@utils/index';

export const initialFormData: LoginFormData = {
  userId: '',
  username: '',
  email: '',
};

export const initialGameData: GameData = {
  id: GameKeyEnum.SKYRIM,
  appId: 0,
  lang: 'en',
  tier: PaymentTierEnum.LARGE,
  quests: [],
  collectables: [],
  locations: [],
  miscellaneous: [],
  settingsConfig: {
    general: [],
    dlc: [],
  },
};

export const initialUser: User = {
  ...initialFormData,
  signup: {
    verification: false,
    setUsername: false,
    selectGame: false,
  },
  account: {
    pwAttempts: 0,
  },
  settings: {
    lang: 'en',
    configs: [],
  },
  gameData: [],
};

export interface MainState {
  readonly showSplashScreen: boolean;
  readonly appState?: AppStateStatus;
  readonly currentScreen?: ScreenEnumType;
  readonly selectedGameData?: GameData;
  readonly selectedGameSettings: GameKeyEnum;
  readonly webSignInConfigured: boolean;
  readonly user: User;
  readonly shouldUpdateUser: boolean;
  readonly searchValue: string;
}

export const initialState: MainState = {
  showSplashScreen: true,
  webSignInConfigured: false,
  currentScreen: UnAuthorizedScreenEnum.Login,
  selectedGameSettings: GameKeyEnum.SKYRIM,
  user: initialUser,
  shouldUpdateUser: false,
  searchValue: '',
};

const getUserDataState = (state: MainState): GameData => {
  if (state.selectedGameData && state.user.gameData) {
    return (
      state.user.gameData.find(
        game => game.id === state.selectedGameData?.id,
      ) ?? initialGameData
    );
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
    setSelectedGameData: (state, action) => {
      state.selectedGameData = action.payload;
    },
    setWebSignInConfigured: (state, action) => {
      state.webSignInConfigured = action.payload;
    },
    setSelectedGameDataSettings: (state, action) => {
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
  },
});

export const {
  setShowSplashScreen,
  setAppState,
  setCurrentScreen,
  setSelectedGameData,
  setSelectedGameDataSettings,
  setWebSignInConfigured,
  setUser,
  setShouldUpdateUser,
  setSearchValue,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
} = slice.actions;

export default slice.reducer;
