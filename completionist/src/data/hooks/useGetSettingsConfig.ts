import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';

interface GetSettingsConfigReturnType {
  shouldShowCompletedItems: () => boolean;
  shouldShowDisabledSections: () => boolean;
}

const useGetSettingsConfig = (): GetSettingsConfigReturnType => {
  const { user } = useMainState();

  const shouldShowCompletedItems = (): boolean => {
    return user.settings.find(item => item.id === SettingsOptionEnum.COMPLETED_ITEMS)?.isActive ?? false;
  };

  const shouldShowDisabledSections = (): boolean => {
    return user.settings.find(item => item.id === SettingsOptionEnum.DISABLED_SECTIONS)?.isActive ?? false;
  };


  return { 
    shouldShowCompletedItems,
    shouldShowDisabledSections 
  };
};

export default useGetSettingsConfig;