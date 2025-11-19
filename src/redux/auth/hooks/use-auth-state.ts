import { useSelector } from 'react-redux';
import { StoreState } from '@utils/index';
import { AuthState } from '../auth-state';

export const useAuthState = (): AuthState => {
  return useSelector((state: StoreState) => state.auth);
};
