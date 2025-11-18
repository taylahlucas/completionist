import { initialFormData } from '@redux/main-state';
import { createSlice } from '@reduxjs/toolkit';
import { LoginFormData } from '@utils/index';

export const initialState: LoginState = {
  loginFormData: initialFormData,
  isGoogleSignIn: false,
  isLoggedIn: false,
  isSigningUp: false,
};

export interface LoginState {
  readonly loginFormData: LoginFormData;
  readonly verificationToken?: string;
  readonly isGoogleSignIn: boolean;
  readonly isLoggedIn: boolean;
  readonly isSigningUp: boolean;
}

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    setIsGoogleSignIn: (state, action) => {
      state.isGoogleSignIn = action.payload;
    },
    setVerificationToken: (state, action) => {
      state.verificationToken = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.isSigningUp = false;
    },
    triggerIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
      state.isLoggedIn = false;
    },
    reset: (state, _) => {
      // TODO: Not working ??
      state.isSigningUp = false;
      state.isLoggedIn = false;
      state.loginFormData = initialFormData;
      state.verificationToken = undefined;
    },
  },
});

export const {
  setLoginFormData,
  setIsGoogleSignIn,
  setVerificationToken,
  setLoggedIn,
  triggerIsSigningUp,
  reset,
} = slice.actions;

export default slice.reducer;
