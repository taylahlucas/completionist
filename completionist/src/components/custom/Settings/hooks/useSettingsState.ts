import { useSelector } from 'react-redux';
import { SettingsState } from '../SettingsState';
import { StoreState } from '@utils/CustomInterfaces';

const useSettingsState = (): SettingsState => {
  return useSelector((state: StoreState) => state.settings);
}

export default useSettingsState;