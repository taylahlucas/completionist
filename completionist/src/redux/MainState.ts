import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { UserFormData } from '@utils/CustomInterfaces';

export interface MainState {
  readonly webSignInConfigured: boolean;
  readonly loggedIn: boolean;
  readonly userFormData: UserFormData;
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly completedQuestIds: string[];
  readonly completedCollectableIds: string[];
  readonly completedBookIds: string[];
  readonly completedLocationIds: string[];
}

export const initialState: MainState = {
  webSignInConfigured: false,
  loggedIn: false,
  userFormData: {
    userId: '',
    name: '',
    email: '',
    subscription: [
      {
        id: SubscriptionTypeEnum.SKYRIM,
        isActive: true
      }
    ]
  },
  searchValue: '',
  showSearchResults: false,
  completedQuestIds: [],
  completedCollectableIds: [],
  completedBookIds: [],
  completedLocationIds: []
}

const slice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setWebSignInConfigured: (state, action) => {
      state.webSignInConfigured = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserFormData: (state, action) => {
      state.userFormData = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    triggerShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setCompletedQuestIds: (state, action) => {
      state.completedQuestIds = action.payload;
    },
    setCompletedCollectableIds: (state, action) => {
      state.completedCollectableIds = action.payload;
    },
    setCompletedBookIds: (state, action) => {
      state.completedBookIds = action.payload;
    },
    setCompletedLocationIds: (state, action) => {
      state.completedLocationIds = action.payload;
    },
    reset: (state) => {
      state.searchValue = initialState.searchValue;
      state.showSearchResults = initialState.showSearchResults;
    }
  }
});

export const {
  setWebSignInConfigured,
  setLoggedIn,
  setUserFormData,
  setSearchValue,
  triggerShowSearchResults,
  setCompletedQuestIds,
  setCompletedCollectableIds,
  setCompletedBookIds,
  setCompletedLocationIds,
  reset
} = slice.actions;
export default slice.reducer;