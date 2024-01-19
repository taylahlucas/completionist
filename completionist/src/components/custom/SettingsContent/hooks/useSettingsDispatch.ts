import { Dispatch } from 'redux';
import { 
  triggerSelectionOpen,
  setSelectedCategory
} from '../SettingsState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface SettingsDispatch {
  triggerSelectionOpen: (value: boolean) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    triggerSelectionOpen(value: boolean): void {
      dispatch(triggerSelectionOpen(value));
    },
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  }
};

export default useSettingsDispatch;