import { useSelector } from 'react-redux';
import { LoginState } from './login-state';
import { StoreState } from '@utils/CustomInterfaces';

export const useLoginState = (): LoginState => {
  return useSelector((state: StoreState) => state.login);
};
