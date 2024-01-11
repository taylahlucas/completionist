import { createSlice } from '@reduxjs/toolkit';

export interface MiscState {
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly selectedCategory: string;
};

export const initialState: MiscState = {
  searchValue: '',
  showSearchResults: false,
  selectedCategory: ''
};

const slice = createSlice({
  name: 'misc',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    triggerShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const {
  setSearchValue,
  triggerShowSearchResults,
  setSelectedCategory
} = slice.actions;

export default slice.reducer;