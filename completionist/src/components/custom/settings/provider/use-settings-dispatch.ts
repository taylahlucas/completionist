import { Dispatch } from 'redux';
import { setSelectedCategory } from './settings-state';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/custom-interfaces';

interface SettingsDispatch {
  setSelectedCategory: (category: DropDownType) => void;
}

export const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  };
};
