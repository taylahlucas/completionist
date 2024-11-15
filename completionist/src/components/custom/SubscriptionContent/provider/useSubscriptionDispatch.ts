import { Dispatch } from 'redux';
import { 
  setSelectedSubscription
} from './SubscriptionState';
import { useAppDispatch } from '@redux/store';
import { SubscriptionOptionsListProps } from '../hooks/useGetSubscriptionOptionsList';

interface SubscriptionDispatch {
  setSelectedSubscription: (type: SubscriptionOptionsListProps) => void;
}

const useSubscriptionDispatch = (): SubscriptionDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedSubscription(type: SubscriptionOptionsListProps): void {
      dispatch(setSelectedSubscription(type));
    }
  }
}

export default useSubscriptionDispatch;
