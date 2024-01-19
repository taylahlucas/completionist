import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { LoginFormData } from '@utils/CustomInterfaces';

export interface LoginState {
  readonly loginFormData: LoginFormData;
  readonly isLoggedIn: boolean;
  readonly isSigningUp: boolean;
};

export const initialFormData: LoginFormData = {
  userId: '',
  name: '',
  email: '',
  userAvatar: '',
  subscription: [
    {
      id: SubscriptionTypeEnum.SKYRIM,
      isActive: true
    },
    {
      id: SubscriptionTypeEnum.FALLOUT_4,
      isActive: true
    }
  ]
}

export const initialState: LoginState = {
  loginFormData: initialFormData,
  isLoggedIn: false,
  isSigningUp: false
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    triggerIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    }
  }
});

export const {
  setLoginFormData,
  setLoggedIn,
  triggerIsSigningUp
} = slice.actions;

export default slice.reducer;