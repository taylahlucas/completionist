import { Dispatch } from 'redux';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { 
  setSelectedGameSettings,
  triggerSelectionOpen
} from '../SettingsState';
import { useAppDispatch } from '@redux/store';

interface SettingsDispatch {
  setSelectedGameSettings: (value: SubscriptionTypeEnum) => void;
  triggerSelectionOpen: (value: boolean) => void;
}

const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedGameSettings(value: SubscriptionTypeEnum): void {
      dispatch(setSelectedGameSettings(value));
    },
    triggerSelectionOpen(value: boolean): void {
      dispatch(triggerSelectionOpen(value));
    },
  }
};

export default useSettingsDispatch;