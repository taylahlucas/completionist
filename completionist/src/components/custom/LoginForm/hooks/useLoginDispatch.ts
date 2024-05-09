import { Dispatch } from 'redux';
import { 
  setLoginFormData,
	setVerificationToken,
	setIsAuthenticated,
  setLoggedIn,
  triggerIsSigningUp
} from '../LoginState';
import { useAppDispatch } from '@redux/store';
import { LoginFormData } from '@utils/CustomInterfaces';

interface LoginDispatch {
  setLoginFormData: (value: LoginFormData) => void;
	setVerificationToken: (token: string | undefined) => void;
	setIsAuthenticated: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  triggerIsSigningUp: (value: boolean) => void;
}

const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setLoginFormData(value: LoginFormData): void {
      dispatch(setLoginFormData(value));
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
    }
  }
};

export default useLoginDispatch;