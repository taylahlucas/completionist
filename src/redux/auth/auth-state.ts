import { AppStateStatus } from 'react-native';
import { createSlice } from '@reduxjs/toolkit';
import { User, ScreenEnumType, LoginFormData } from '@utils/index';

export const initialFormData: LoginFormData = {
  userId: '',
  username: '',
  email: '',
};

export interface AuthState {
  readonly isLoggedIn: boolean;
  readonly isSigningUp: boolean;
  readonly isGoogleSignIn: boolean;
  readonly loginFormData: LoginFormData;
  readonly verificationToken?: string;
  readonly user?: User;
  // tODO: Do we need these here?
  readonly appState?: AppStateStatus;
  readonly currentScreen?: ScreenEnumType;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  isSigningUp: false,
  // TODO: Remove initial ? set ot optional
  loginFormData: initialFormData,
  isGoogleSignIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isLoggedIn = action.payload;
      state.isSigningUp = false;
    },
    triggerIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
      state.isLoggedIn = false;
    },
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    setIsGoogleSignIn: (state, action) => {
      state.isGoogleSignIn = action.payload;
    },
    setVerificationToken: (state, action) => {
      state.verificationToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  triggerIsSigningUp,
  setLoginFormData,
  setIsGoogleSignIn,
  setVerificationToken,
  setUser,
  setAppState,
  setCurrentScreen,
} = slice.actions;

export default slice.reducer;
