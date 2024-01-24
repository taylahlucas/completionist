import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/CustomInterfaces';

export interface SettingsState {
  readonly isSelectionOpen: boolean;
  readonly selectedCategory: DropDownType;
};

export const initialState: SettingsState = {
  isSelectionOpen: false,
  selectedCategory: {
    category: ''
  }
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    triggerSelectionOpen: (state, action) => {
      state.isSelectionOpen = action.payload;
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
  triggerSelectionOpen,
  setSelectedCategory
} = slice.actions;

export default slice.reducer;