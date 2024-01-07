import { useSelector } from 'react-redux';
import { LoginState } from '../LoginState';
import { StoreState } from '@utils/CustomInterfaces';

const useLoginState = (): LoginState => {
  return useSelector((state: StoreState) => state.login);
}

export default useLoginState;