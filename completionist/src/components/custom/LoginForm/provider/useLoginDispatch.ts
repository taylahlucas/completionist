import { Dispatch } from 'redux';
import { 
  setLoginFormData,
  setIsGoogleSignIn,
	setVerificationToken,
	setIsAuthenticated,
  setLoggedIn,
  triggerIsSigningUp,
	reset
} from './LoginState';
import { useAppDispatch } from '@redux/store';
import { LoginFormData } from '@utils/CustomInterfaces';

interface LoginDispatch {
  setLoginFormData: (value: LoginFormData) => void;
  setIsGoogleSignIn: (value: boolean) => void;
	setVerificationToken: (token: string | undefined) => void;
	setIsAuthenticated: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  triggerIsSigningUp: (value: boolean) => void;
	reset: () => void;
}

const useLoginDispatch = (): LoginDispatch => {
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
		setIsAuthenticated(value: boolean): void {
			dispatch(setIsAuthenticated(value));
		},
    setLoggedIn(value: boolean): void {
      dispatch(setLoggedIn(value));
    },
    triggerIsSigningUp(value: boolean): void {
      dispatch(triggerIsSigningUp(value));
    },
		reset(): void {
			dispatch(reset(null));
		}
  }
};

export default useLoginDispatch;