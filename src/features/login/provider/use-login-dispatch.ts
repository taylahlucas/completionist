import { Dispatch } from 'redux';
import {
  setLoginFormData,
  setIsGoogleSignIn,
  setVerificationToken,
  setLoggedIn,
  triggerIsSigningUp,
} from './login-state';
import { useAppDispatch } from '@redux/store';
import { LoginFormData } from '@utils/index';

interface LoginDispatch {
  setLoginFormData: (value: LoginFormData) => void;
  setIsGoogleSignIn: (value: boolean) => void;
  setVerificationToken: (token: string | undefined) => void;
  setLoggedIn: (value: boolean) => void;
  triggerIsSigningUp: (value: boolean) => void;
}

export const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setLoginFormData(value: LoginFormData): void {
      dispatch(setLoginFormData(value));
    },
    setIsGoogleSignIn(value: boolean): void {
      dispatch(setIsGoogleSignIn(value));
    },
    setVerificationToken(token: string | undefined): void {
      dispatch(setVerificationToken(token));
    },
    setLoggedIn(value: boolean): void {
      dispatch(setLoggedIn(value));
    },
    triggerIsSigningUp(value: boolean): void {
      dispatch(triggerIsSigningUp(value));
    },
  };
};
