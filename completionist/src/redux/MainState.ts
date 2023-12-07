import { createSlice } from '@reduxjs/toolkit';

export interface MainState {
  readonly loggedIn: boolean;
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly completedQuestIds: string[];
  readonly completedCollectableIds: string[];
  readonly completedBookIds: string[];
  readonly completedLocationIds: string[];
}

export const initialState: MainState = {
  loggedIn: false,
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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
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
  setLoggedIn,
  setSearchValue,
  triggerShowSearchResults,
  setCompletedQuestIds,
  setCompletedCollectableIds,
  setCompletedBookIds,
  setCompletedLocationIds,
  reset
} = slice.actions;
export default slice.reducer;