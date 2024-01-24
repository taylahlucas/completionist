import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';
import { ContentSection } from '@utils/CustomTypes';

export interface ContentState {
  readonly sectionType: ContentSection;
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
};

export const initialState: ContentState = {
  sectionType: 'Quests',
  searchValue: '',
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  name: 'content',
  initialState: initialState,
  reducers: {
    setSelectedSection: (state, action) => {
      state.sectionType = action.payload;
    },
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
  setSelectedSection,
  setSearchValue,
  setSelectedCategory
} = slice.actions;

export default slice.reducer;