import { createSlice } from '@reduxjs/toolkit';
import { Book } from '@utils/CustomInterfaces';

export interface MainState {
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly completedQuestIds: string[];
  readonly completedCollectableIds: string[];
  readonly completedBookIds: string[];
  readonly completedLocationIds: string[];
}

export const initialState: MainState = {
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
  setSearchValue,
  triggerShowSearchResults,
  setCompletedQuestIds,
  setCompletedCollectableIds,
  setCompletedBookIds,
  setCompletedLocationIds,
  reset
} = slice.actions;
export default slice.reducer;