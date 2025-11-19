import { initialGameData } from '@redux/main-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  ContentSectionEnum,
  DropDownType,
  GameContentItem,
  GameData,
} from '@utils/index';

export interface ContentState {
  readonly sectionType: ContentSectionEnum;
  readonly selectedGameData: GameData;
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
  selectedGameData: initialGameData,
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
    setSelectedGameData: (state, action) => {
      state.selectedGameData = action.payload;
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
  },
});

export const {
  setSelectedSection,
  setSelectedGameData,
  setSearchValue,
  setSelectedCategory,
  setWebViewHref,
  setGameContent,
} = slice.actions;

export default slice.reducer;
