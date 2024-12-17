import { useSelector } from 'react-redux';
import { MainState } from '../MainState';
import { StoreState } from '@utils/CustomInterfaces';

const useMainState = (): MainState => {
  return useSelector((state: StoreState) => state.main);
};

export default useMainState;
