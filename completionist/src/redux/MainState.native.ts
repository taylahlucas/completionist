import { createSlice } from '@reduxjs/toolkit';

export interface MainState {
  readonly searchValue: string;
  readonly showSearchResults: boolean;
}

export const initialState: MainState = {
  searchValue: '',
  showSearchResults: false
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
    reset: (state) => {
      state.searchValue = initialState.searchValue;
      state.showSearchResults = initialState.showSearchResults;
    }
  }
});

export const {
  setSearchValue,
  triggerShowSearchResults, 
  reset
} = slice.actions;
export default slice.reducer;