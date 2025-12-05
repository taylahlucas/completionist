import { IsActive } from '@api/';
import { getCurrentGame } from '@data/helpers';
import { useAuthUser } from '@redux/auth';
import { useMainState } from '@redux/hooks';

interface GetUserGameDataReturnType {
  userSettingsMainConfig: IsActive[];
  getUserSettingsSubConfig: (section: string) => IsActive[];
  getUserSettingsDLC: (section: string) => IsActive[];
}

export const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { selectedGameSettings } = useMainState();
  const user = useAuthUser();
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
