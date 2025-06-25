import useMainState from '@redux/hooks/use-main-state';
import { SettingsOptionEnum } from '@utils/CustomEnums';

interface GetSettingsConfigReturnType {
  shouldShowCompletedItems: () => boolean;
  shouldHideDisabledSections: () => boolean;
}

export const useGetSettingsConfig = (): GetSettingsConfigReturnType => {
  const { user } = useMainState();

  const shouldShowCompletedItems = (): boolean => {
    return (
      user.settings.configs.find(
        item => item.id === SettingsOptionEnum.COMPLETED_ITEMS,
      )?.isActive ?? true
    );
  };

  const shouldHideDisabledSections = (): boolean => {
    return (
      user.settings.configs.find(
        item => item.id === SettingsOptionEnum.DISABLED_SECTIONS,
      )?.isActive ?? true
    );
  };

  return {
    shouldShowCompletedItems,
    shouldHideDisabledSections,
  };
};
