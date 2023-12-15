import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

export interface SettingsState {
  readonly selectedGameSettings: SubscriptionTypeEnum;
  readonly isSelectionOpen: boolean;
};

export const initialState: SettingsState = {
  selectedGameSettings: SubscriptionTypeEnum.SKYRIM,
  isSelectionOpen: false
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setSelectedGameSettings: (state, action) => {
      state.selectedGameSettings = action.payload;
    },
    triggerSelectionOpen: (state, action) => {
      state.isSelectionOpen = action.payload;
    },
  }
});

export const {
  setSelectedGameSettings,
  triggerSelectionOpen
} = slice.actions;

export default slice.reducer;