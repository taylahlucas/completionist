import { Dispatch } from 'redux';
import { 
  triggerSelectionOpen
} from '../SettingsState';
import { useAppDispatch } from '@redux/store';

interface SettingsDispatch {
  triggerSelectionOpen: (value: boolean) => void;
}

const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    triggerSelectionOpen(value: boolean): void {
      dispatch(triggerSelectionOpen(value));
    },
  }
};

export default useSettingsDispatch;