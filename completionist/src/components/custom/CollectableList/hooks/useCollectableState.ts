import { useSelector } from 'react-redux';
import { CollectableState } from '../CollectableState';
import { StoreState } from '@utils/CustomInterfaces';

const useCollectableState = (): CollectableState => {
  return useSelector((state: StoreState) => state.collectable);
}

export default useCollectableState;