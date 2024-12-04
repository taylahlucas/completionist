import { useSelector } from 'react-redux';
import { SubscriptionState } from './SubscriptionState';
import { StoreState } from '@utils/CustomInterfaces';

const useSubscriptionState = (): SubscriptionState => {
  return useSelector((state: StoreState) => state.subscription);
}

export default useSubscriptionState;