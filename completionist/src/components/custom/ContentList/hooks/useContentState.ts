import { useSelector } from 'react-redux';
import { ContentState } from '../ContentState';
import { StoreState } from '@utils/CustomInterfaces';

const useContentState = (): ContentState => {
  return useSelector((state: StoreState) => state.content);
}

export default useContentState;