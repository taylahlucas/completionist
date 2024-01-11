import { useSelector } from 'react-redux';
import { LocationState } from '../LocationState';
import { StoreState } from '@utils/CustomInterfaces';

const useLocationState = (): LocationState => {
  return useSelector((state: StoreState) => state.location);
}

export default useLocationState;