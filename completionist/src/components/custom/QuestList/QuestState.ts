import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';

export interface QuestState {
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
};

export const initialState: QuestState = {
  searchValue: '',
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  title: 'quest',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const {
  setSearchValue,
  setSelectedCategory
} = slice.actions;

export default slice.reducer;