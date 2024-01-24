import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';

export interface LocationState {
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
};

export const initialState: LocationState = {
  searchValue: '',
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  title: 'location',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
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
  setSelectedCategory
} = slice.actions;

export default slice.reducer;