import { Dispatch } from 'redux';
import {
  setLoginFormData,
  setIsGoogleSignIn,
  setVerificationToken,
  setIsAuthenticated,
  triggerIsSigningUp,
  setUser,
  setCurrentScreen,
  setAppState,
} from '../auth-state';
import { useAppDispatch } from '@redux/store';
import { LoginFormData, ScreenEnumType, User } from '@utils/index';

interface AuthDispatch {
  setIsAuthenticated: (value: boolean) => void;
  setLoginFormData: (value: LoginFormData) => void;
  triggerIsSigningUp: (value: boolean) => void;
  setIsGoogleSignIn: (value: boolean) => void;
  setVerificationToken: (token: string | undefined) => void;
  setUser: (value: User) => void;
  setCurrentScreen: (value: ScreenEnumType) => void;
  setAppState: (value: string) => void;
}

export const useAuthDispatch = (): AuthDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setIsAuthenticated(value: boolean): void {
      dispatch(setIsAuthenticated(value));
    },
    triggerIsSigningUp(value: boolean): void {
      dispatch(triggerIsSigningUp(value));
    },
    setLoginFormData(value: LoginFormData): void {
      dispatch(setLoginFormData(value));
    },
    setIsGoogleSignIn(value: boolean): void {
      dispatch(setIsGoogleSignIn(value));
    },
    setVerificationToken(token: string | undefined): void {
      dispatch(setVerificationToken(token));
    },
    setUser(value: User): void {
      dispatch(setUser(value));
    },
    setCurrentScreen(value: ScreenEnumType): void {
      dispatch(setCurrentScreen(value));
    },
    setAppState(value: string): void {
      dispatch(setAppState(value));
    },
  };
};
