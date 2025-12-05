import { IsActive, SettingsOptionsKey } from '@api/';
import { useAuthUser } from '@redux/auth';

interface GetSettingsConfigReturnType {
  shouldShowCompletedItems: () => boolean;
  shouldHideDisabledSections: () => boolean;
}

export const useGetSettingsConfig = (): GetSettingsConfigReturnType => {
  const user = useAuthUser();

  const shouldShowCompletedItems = (): boolean => {
    return (
      user?.settings.configs.find(
        (item: IsActive) => item.id === SettingsOptionsKey.completedItems,
      )?.isActive ?? true
    );
  };

  const shouldHideDisabledSections = (): boolean => {
    return (
      user?.settings.configs.find(
        (item: IsActive) => item.id === SettingsOptionsKey.disabledSections,
      )?.isActive ?? true
    );
  };

  return {
    shouldShowCompletedItems,
    shouldHideDisabledSections,
  };
};
