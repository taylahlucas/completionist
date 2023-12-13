import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { User, UserFormData } from '@utils/CustomInterfaces';
import { AppStateStatus } from 'react-native';

export const initialUser: User = {
  userId: '',
  name: '',
  email: '',
  userAvatar: '',
  subscription: [
    {
      id: SubscriptionTypeEnum.SKYRIM,
      isActive: true
    }
  ],
  data: {
    skyrim: {
      quests: [],
      collectables: [],
      locations: [],
      miscellaneous: []
    },
    fallout4: {
      quests: [],
      collectables: [],
      locations: [],
      miscellaneous: []
    }
  }
}

export const initialFormData: UserFormData = {
  userId: '',
  name: '',
  email: '',
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

export interface MainState {
  readonly appState?: AppStateStatus,
  readonly webSignInConfigured: boolean;
  readonly isLoggedIn: boolean;
  readonly userFormData: UserFormData;
  readonly user: User;
  readonly searchValue: string;
  readonly showSearchResults: boolean;
}

export const initialState: MainState = {
  webSignInConfigured: false,
  isLoggedIn: false,
  userFormData: initialFormData,
  user: initialUser,
  searchValue: '',
  showSearchResults: false
}

const slice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setWebSignInConfigured: (state, action) => {
      state.webSignInConfigured = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserFormData: (state, action) => {
      state.userFormData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    triggerShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setCompletedQuests: (state, action) => {
      state.user.data.skyrim.quests = action.payload;
    },
    setCompletedCollectables: (state, action) => {
      state.user.data.skyrim.collectables = action.payload;
    },
    setCompletedLocations: (state, action) => {
      state.user.data.skyrim.locations = action.payload;
    },
    setCompletedMiscItems: (state, action) => {
      state.user.data.skyrim.miscellaneous = action.payload;
    },
    reset: (state) => {
      state.searchValue = initialState.searchValue;
      state.showSearchResults = initialState.showSearchResults;
    }
  }
});

export const {
  setAppState,
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