import { Dispatch } from 'redux';
import { 
  setSelectedCategory
} from './SettingsState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface SettingsDispatch {
  setSelectedCategory: (category: DropDownType) => void;
}

const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  }
};

export default useSettingsDispatch;