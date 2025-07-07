import { getCurrentGame } from '@data/helpers';
import { useMainState } from '@redux/hooks';
import { Item, IsActive } from '@utils/index';

interface GetUserGameDataReturnType {
  getUserSettingsSubConfig: (section: string) => IsActive[];
  getUserSettingsDLC: (section: string) => IsActive[];
}

export const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGame, selectedGameSettings } = useMainState();
  const currentGame = getCurrentGame(selectedGameSettings, user);

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
    getUserSettingsSubConfig,
    getUserSettingsDLC,
  };
};
