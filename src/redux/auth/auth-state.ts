import { AppStateStatus } from 'react-native';
import { createSlice } from '@reduxjs/toolkit';
import { User, ScreenEnumType, LoginFormData } from '@utils/index';

export const initialFormData: LoginFormData = {
  userId: '',
  username: '',
  email: '',
};

export interface AuthState {
  readonly isGoogleSignIn: boolean;
  readonly loginFormData: LoginFormData;
  readonly verificationToken?: string;
  readonly user?: User;
  // tODO: Do we need these here?
  readonly appState?: AppStateStatus;
  readonly currentScreen?: ScreenEnumType;
}

export const initialState: AuthState = {
  // TODO: Remove initial ? set ot optional
  loginFormData: initialFormData,
  isGoogleSignIn: false,
};

const slice = createSlice({
  name: 'auth',
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
  setLoginFormData,
  setIsGoogleSignIn,
  setVerificationToken,
  setUser,
  setAppState,
  setCurrentScreen,
} = slice.actions;

export default slice.reducer;
