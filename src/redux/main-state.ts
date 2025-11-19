import { createSlice } from '@reduxjs/toolkit';
import { GameKeyEnum, PaymentTierEnum } from '@utils/custom-enums';
import { DEFAULT_LANG, GameData } from '@utils/index';

export const initialGameData: GameData = {
  id: GameKeyEnum.SKYRIM,
  appId: 0,
  lang: DEFAULT_LANG,
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

export interface MainState {
  readonly showSplashScreen: boolean;
  readonly shouldUpdateUser: boolean;
  readonly selectedGameData?: GameData;
  readonly selectedGameSettings: GameKeyEnum;
  readonly webSignInConfigured: boolean;
  readonly searchValue: string;
}

export const initialState: MainState = {
  showSplashScreen: false,
  shouldUpdateUser: false,
  webSignInConfigured: false,
  selectedGameSettings: GameKeyEnum.SKYRIM,
  searchValue: '',
};

// const getUserDataState = (state: MainState): GameData => {
//   if (state.selectedGameData && state.user.gameData) {
//     return (
//       state.user.gameData.find(
//         game => game.id === state.selectedGameData?.id,
//       ) ?? initialGameData
//     );
//   }
//   return initialGameData;
// };

const slice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setShowSplashScreen: (state, action) => {
      state.showSplashScreen = action.payload;
    },
    setShouldUpdateUser: (state, action) => {
      state.shouldUpdateUser = action.payload;
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCompletedQuests: (state, action) => {
      state.shouldUpdateUser = true;
      if (state.selectedGameData) {
        // const userData = getUserDataState(state);
        // userData.quests = action.payload;
        state.selectedGameData.quests = action.payload;
      }
    },
    setCompletedCollectables: (state, action) => {
      state.shouldUpdateUser = true;
      if (state.selectedGameData) {
        // const userData = getUserDataState(state);
        // userData.collectables = action.payload;
        state.selectedGameData.collectables = action.payload;
      }
    },
    setCompletedLocations: (state, action) => {
      state.shouldUpdateUser = true;
      if (state.selectedGameData) {
        // const userData = getUserDataState(state);
        // userData.locations = action.payload;
        state.selectedGameData.locations = action.payload;
      }
    },
    setCompletedMiscItems: (state, action) => {
      state.shouldUpdateUser = true;
      if (state.selectedGameData) {
        // const userData = getUserDataState(state);
        // userData.miscellaneous = action.payload;
        state.selectedGameData.miscellaneous = action.payload;
      }
    },
  },
});

export const {
  setShowSplashScreen,
  setShouldUpdateUser,
  setSelectedGameData,
  setSelectedGameDataSettings,
  setWebSignInConfigured,
  setSearchValue,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
} = slice.actions;

export default slice.reducer;
