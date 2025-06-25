import { useSelector } from 'react-redux';
import { SettingsState } from './settings-state';
import { StoreState } from '@utils/custom-interfaces';

export const useSettingsState = (): SettingsState => {
  return useSelector((state: StoreState) => state.settings);
};
