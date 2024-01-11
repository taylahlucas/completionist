import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';

export interface LocationState {
  readonly searchValue: string;
  readonly showSearchResults: boolean;
  readonly selectedCategory: DropDownType;
};

export const initialState: LocationState = {
  searchValue: '',
  showSearchResults: false,
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    triggerShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setSelectedCategory: (state, action) => {
      if (action.payload.category === '') {
        state.selectedCategory = {
          category: ''
        }
      }
      else {
        state.selectedCategory = action.payload;
      }
    }
  }
});

export const {
  setSearchValue,
  triggerShowSearchResults,
  setSelectedCategory
} = slice.actions;

export default slice.reducer;