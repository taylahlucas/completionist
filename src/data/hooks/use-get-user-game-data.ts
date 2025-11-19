import { getCurrentGame } from '@data/helpers';
import { useAuthState } from '@redux/auth';
import { useMainState } from '@redux/hooks';
import { IsActive } from '@utils/index';

interface GetUserGameDataReturnType {
  userSettingsMainConfig: IsActive[];
  getUserSettingsSubConfig: (section: string) => IsActive[];
  getUserSettingsDLC: (section: string) => IsActive[];
}

export const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { selectedGameSettings } = useMainState();
  const { user } = useAuthState();
  const currentGame = getCurrentGame(selectedGameSettings, user);

  const userSettingsMainConfig =
    currentGame?.settingsConfig.general?.map(item => item.section) ?? [];

  const getUserSettingsSubConfig = (section: string): IsActive[] => {
    return (
      currentGame?.settingsConfig.general?.find(
        item => item.section.id === section,
      )?.categories ?? []
    );
  };

  const getUserSettingsDLC = (section: string): IsActive[] => {
    return (
      currentGame?.settingsConfig.general?.find(
        item => item.section.id === section,
      )?.dlc ?? []
    );
  };

  return {
    userSettingsMainConfig,
    getUserSettingsSubConfig,
    getUserSettingsDLC,
  };
};
