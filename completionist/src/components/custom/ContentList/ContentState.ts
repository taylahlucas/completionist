import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';
import { ContentSectionEnum } from '@utils/CustomEnums';

export interface ContentState {
  readonly sectionType: ContentSectionEnum;
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
};

export const initialState: ContentState = {
  sectionType: ContentSectionEnum.QUESTS,
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