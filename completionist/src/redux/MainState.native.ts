import { createSlice } from '@reduxjs/toolkit';
import { Book } from '@utils/CustomInterfaces';

export interface MainState {
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly completedBookIds: string[];
}

export const initialState: MainState = {
  searchValue: '',
  showSearchResults: false,
  completedBookIds: []
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
    setCompletedBookIds: (state, action) => {
      state.completedBookIds = action.payload;
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
  setCompletedBookIds,
  reset
} = slice.actions;
export default slice.reducer;