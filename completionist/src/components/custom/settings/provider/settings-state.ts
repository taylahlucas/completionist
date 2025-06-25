import { createSlice } from '@reduxjs/toolkit';
import { DropDownType } from '@utils/custom-interfaces';

export interface SettingsState {
  readonly selectedCategory: DropDownType;
}

export const initialState: SettingsState = {
  selectedCategory: {
    category: '',
  },
};

// TODO: Manage this outside of redux -- maybe prop drilling?
const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      if (action.payload.category === '') {
        state.selectedCategory = {
          category: '',
        };
      } else {
        state.selectedCategory = action.payload;
      }
    },
  },
});

export const { setSelectedCategory } = slice.actions;

export default slice.reducer;
