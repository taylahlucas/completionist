import { useSelector } from 'react-redux';
import { SettingsState } from './settings-state';
import { StoreState } from '@utils/CustomInterfaces';

export const useSettingsState = (): SettingsState => {
  return useSelector((state: StoreState) => state.settings);
};
