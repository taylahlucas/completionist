import { createSlice } from '@reduxjs/toolkit';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { GeneralData, SettingsConfigItem, User, UserFormData } from '@utils/CustomInterfaces';
import { AppStateStatus } from 'react-native';

export const initialGameData: GeneralData = {
  quests: [],
  collectables: [],
  locations: [],
  miscellaneous: [],
  settingsConfig: []
}

export const initialFormData: UserFormData = {
  userId: '',
  name: '',
  email: '',
  userAvatar: '',
  subscription: [
    {
      id: SubscriptionTypeEnum.SKYRIM,
      isActive: true
    },
    {
      id: SubscriptionTypeEnum.FALLOUT_4,
      isActive: true
    }
  ]
}

export const initialUser: User = {
  ...initialFormData,
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
  readonly selectedGameSettings: SubscriptionTypeEnum;
  readonly webSignInConfigured: boolean;
  readonly isLoggedIn: boolean;
  readonly userFormData: UserFormData;
  readonly user: User;
  readonly userSettings: SettingsConfigItem[];
  readonly searchValue: string;
  readonly showSearchResults: boolean;
}

export const initialState: MainState = {
  showSplashScreen: true,
  webSignInConfigured: false,
  currentScreen: ScreenEnum.Login,
  isLoggedIn: false,
  selectedGameSettings: SubscriptionTypeEnum.SKYRIM,
  userFormData: initialFormData,
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
          state.userSettings = state.user.data.skyrim.settingsConfig;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.userSettings = state.user.data.fallout4.settingsConfig;
          break;
      }
    },
    setWebSignInConfigured: (state, action) => {
      state.webSignInConfigured = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setSelectedGameSettings: (state, action) => {
      state.selectedGameSettings = action.payload;
    },
    setUserFormData: (state, action) => {
      state.userFormData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          state.userSettings = state.user.data.skyrim.settingsConfig;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.userSettings = state.user.data.fallout4.settingsConfig;
          break;
      }
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    triggerShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setCompletedQuests: (state, action) => {
      switch (state.selectedGame) {
        case SubscriptionTypeEnum.SKYRIM:
          console.log("updating quests")
          state.user.data.skyrim.quests = action.payload;
          break;
        case SubscriptionTypeEnum.FALLOUT_4:
          state.user.data.fallout4.quests = action.payload;
          break;
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
  setLoggedIn,
  setUserFormData,
  setUser,
  setSearchValue,
  triggerShowSearchResults,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
  reset
} = slice.actions;

export default slice.reducer;