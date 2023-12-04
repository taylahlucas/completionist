import { createSlice } from '@reduxjs/toolkit';

export interface MainState {
  readonly searchValue: string;
}

export const initialState: MainState = {
  searchValue: ''
}

const slice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    }
  }
});

export const {
  setSearchValue,
} = slice.actions;
export default slice.reducer;