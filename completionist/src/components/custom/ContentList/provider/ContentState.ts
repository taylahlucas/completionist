import { createSlice } from '@reduxjs/toolkit';
import { DropDownType, GameContentItem } from '@utils/CustomInterfaces';
import { ContentSectionEnum } from '@utils/CustomEnums';

export interface ContentState {
  readonly sectionType: ContentSectionEnum;
  readonly searchValue: string;
  readonly selectedCategory: DropDownType;
  readonly webViewHref?: string;
  readonly gameContent?: {
    quests: GameContentItem[];
    collectables: GameContentItem[];
    locations: GameContentItem[];
    miscellaneous: GameContentItem[];
  };
}

export const initialState: ContentState = {
  sectionType: ContentSectionEnum.QUESTS,
  searchValue: '',
  selectedCategory: {
    category: '',
  },
  gameContent: {
    quests: [],
    collectables: [],
    locations: [],
    miscellaneous: [],
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
          category: '',
        };
      } else {
        state.selectedCategory = action.payload;
      }
    },
    setWebViewHref: (state, action) => {
      state.webViewHref = action.payload;
    },
    setGameContent: (state, action) => {
      state.gameContent = action.payload;
    },
    reset: state => {
      state = initialState;
    },
  },
});

export const {
  setSelectedSection,
  setSearchValue,
  setSelectedCategory,
  setWebViewHref,
  setGameContent,
  reset,
} = slice.actions;

export default slice.reducer;
