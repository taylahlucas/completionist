import { useSelector } from 'react-redux';
import { ContentState } from './content-state';
import { StoreState } from '@utils/custom-interfaces';

export const useContentState = (): ContentState => {
  return useSelector((state: StoreState) => state.content);
};
