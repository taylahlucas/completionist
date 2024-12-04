import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';
import { ContentSectionEnum } from '@utils/CustomEnums';

export interface ContentState {
  readonly sectionType: ContentSectionEnum;
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
	readonly webViewHref?: string;
};

export const initialState: ContentState = {
  sectionType: ContentSectionEnum.QUESTS,
  searchValue: '',
  selectedCategory: {
    category: ''
  },
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
    },
		setWebViewHref: (state, action) => {
			state.webViewHref = action.payload;
		},
    reset: (state) => {
			state = initialState;
    }
  }
});

export const {
  setSelectedSection,
  setSearchValue,
  setSelectedCategory,
	setWebViewHref,
  reset
} = slice.actions;

export default slice.reducer;