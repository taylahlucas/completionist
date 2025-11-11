import { useSelector } from 'react-redux';
import { MainState } from '../main-state';
import { StoreState } from '@utils/index';

export const useMainState = (): MainState => {
  return useSelector((state: StoreState) => state.main);
};
