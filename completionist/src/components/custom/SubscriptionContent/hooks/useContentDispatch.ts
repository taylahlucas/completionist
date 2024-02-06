import { Dispatch } from 'redux';
import { 
  setSelectedSubscription
} from '../SubscriptionState';
import { useAppDispatch } from '@redux/store';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface SubscriptionDispatch {
  setSelectedSubscription: (type: SubscriptionTypeEnum) => void;
}

const useSubscriptionDispatch = (): SubscriptionDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedSubscription(type: SubscriptionTypeEnum): void {
      dispatch(setSelectedSubscription(type));
    }
  }
}

export default useSubscriptionDispatch;
