import { createSlice } from '@reduxjs/toolkit';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { GeneralData, SettingsConfigItem, User } from '@utils/CustomInterfaces';
import { AppStateStatus } from 'react-native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

export const initialGameData: GeneralData = {
  quests: [],
  collectables: [],
  locations: [],
  miscellaneous: [],
  settingsConfig: []
}

export const initialUser: User = {
  ...initialFormData,
  subscription: [],
  settings: [],
  data: {
    skyrim: initialGameData,
    fallout4: initialGameData
  }
}

export interface MainState {
  readonly showSplashScreen: boolean;
  readonly appState?: AppStateStatus,
  readonly currentScreen?: ScreenEnum;
  readonly selectedGame?: SubscriptionTypeEnum;
  readonly selectedGameData?: GeneralData;
  readonly selectedGameSettings: SubscriptionTypeEnum;
  readonly webSignInConfigured: boolean;
  readonly user: User;
  readonly userSettings: SettingsConfigItem[];
  readonly searchValue: string;
  readonly showSearchResults: boolean;
}

export const initialState: MainState = {
  showSplashScreen: true,
  webSignInConfigured: false,
  currentScreen: ScreenEnum.Login,
  selectedGameSettings: SubscriptionTypeEnum.SKYRIM,
  user: initialUser,
  userSettings: [],
  searchValue: '',
  showSearchResults: false,
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
        case SubscriptionTypeEnum.SKYRIM:
          state.selectedGameData = state.user.data.skyrim;
          state.userSettings = state.user.data.skyrim.settingsConfig;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.selectedGameData = state.user.data.fallout4;
          state.userSettings = state.user.data.fallout4.settingsConfig;
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
        case SubscriptionTypeEnum.SKYRIM:
          state.selectedGameData = state.user.data.skyrim;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.selectedGameData = state.user.data.fallout4;
          break;
      }
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCompletedQuests: (state, action) => {
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          state.user.data.skyrim.quests = action.payload;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.user.data.fallout4.quests = action.payload;
          break;
      }
      if (!!state.selectedGameData) {
        state.selectedGameData.quests = action.payload;
      }
    },
    setCompletedCollectables: (state, action) => {
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          state.user.data.skyrim.collectables = action.payload;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.user.data.fallout4.collectables = action.payload;
          break;
      }
      if (!!state.selectedGameData) {
        state.selectedGameData.collectables = action.payload;
      }
    },
    setCompletedLocations: (state, action) => {
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          state.user.data.skyrim.locations = action.payload;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.user.data.fallout4.locations = action.payload;
          break;
      }
      if (!!state.selectedGameData) {
        state.selectedGameData.locations = action.payload;
      }
    },
    setCompletedMiscItems: (state, action) => {
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          state.user.data.skyrim.miscellaneous = action.payload;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.user.data.fallout4.miscellaneous = action.payload;
          break;
      }
      if (!!state.selectedGameData) {
        state.selectedGameData.miscellaneous = action.payload;
      }
    },
    reset: (state) => {
      state.searchValue = initialState.searchValue;
      state.showSearchResults = initialState.showSearchResults;
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
  setSearchValue,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
  reset
} = slice.actions;

export default slice.reducer;