import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';

interface GetSettingsConfigReturnType {
  shouldShowCompletedItems: () => boolean;
  shouldShowDisabledSections: () => boolean;
}

const useGetSettingsConfig = (): GetSettingsConfigReturnType => {
  const { user } = useMainState();

  const shouldShowCompletedItems = (): boolean => {
    return user.settings.configs.find(item => item.id === SettingsOptionEnum.COMPLETED_ITEMS)?.isActive ?? true;
  };

  const shouldShowDisabledSections = (): boolean => {
    return user.settings.configs.find(item => item.id === SettingsOptionEnum.DISABLED_SECTIONS)?.isActive ?? true;
  };


  return { 
    shouldShowCompletedItems,
    shouldShowDisabledSections 
  };
};

export default useGetSettingsConfig;