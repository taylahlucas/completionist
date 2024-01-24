import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';

export interface ContentState {
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
};

export const initialState: ContentState = {
  searchValue: '',
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  name: 'content',
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