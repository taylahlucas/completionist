import { createSlice } from '@reduxjs/toolkit';
import { LoginFormData } from '@utils/CustomInterfaces';

export interface LoginState {
  readonly loginFormData: LoginFormData;
  readonly isSigningUp: boolean;
};

export const initialState: LoginState = {
  loginFormData: {
    name: '',
    email: '',
    password: ''
  },
  isSigningUp: false
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    triggerIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    }
  }
});

export const {
  setLoginFormData,
  triggerIsSigningUp
} = slice.actions;

export default slice.reducer;