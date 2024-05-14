import { createSlice } from '@reduxjs/toolkit';
import { LoginFormData } from '@utils/CustomInterfaces';

export interface LoginState {
  readonly loginFormData: LoginFormData;
	readonly verificationToken?: string;
	readonly isAuthenticated: boolean;
  readonly isLoggedIn: boolean;
  readonly isSigningUp: boolean;
};

export const initialFormData: LoginFormData = {
  userId: '',
  name: '',
  email: '',
  userAvatar: ''
}

export const initialState: LoginState = {
  loginFormData: initialFormData,
	isAuthenticated: false,
  isLoggedIn: false,
  isSigningUp: false,
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
		setVerificationToken: (state, action) => {
			state.verificationToken = action.payload;
		},
		setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.isSigningUp = false;
    },
    triggerIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    }
		// TODO: Add reset to reset loginFormData
  }
});

export const {
  setLoginFormData,
	setVerificationToken,
	setIsAuthenticated,
  setLoggedIn,
  triggerIsSigningUp
} = slice.actions;

export default slice.reducer;