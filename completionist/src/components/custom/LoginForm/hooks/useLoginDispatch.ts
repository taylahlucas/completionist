import { Dispatch } from 'redux';
import { 
  setLoginFormData,
  triggerIsSigningUp
} from '../LoginState';
import { useAppDispatch } from '@redux/store';
import { LoginFormData } from '@utils/CustomInterfaces';

interface LoginDispatch {
  setLoginFormData: (value: LoginFormData) => void;
  triggerIsSigningUp: (value: boolean) => void;
}

const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setLoginFormData(value: LoginFormData): void {
      dispatch(setLoginFormData(value));
    },
    triggerIsSigningUp(value: boolean): void {
      dispatch(triggerIsSigningUp(value));
    }
  }
};

export default useLoginDispatch;