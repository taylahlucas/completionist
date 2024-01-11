import { useSelector } from 'react-redux';
import { MiscState } from '../MiscState';
import { StoreState } from '@utils/CustomInterfaces';

const useMiscState = (): MiscState => {
  return useSelector((state: StoreState) => state.misc);
}

export default useMiscState;