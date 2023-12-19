import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  readonly isSelectionOpen: boolean;
};

export const initialState: SettingsState = {
  isSelectionOpen: false
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    triggerSelectionOpen: (state, action) => {
      state.isSelectionOpen = action.payload;
    },
  }
});

export const {
  triggerSelectionOpen
} = slice.actions;

export default slice.reducer;