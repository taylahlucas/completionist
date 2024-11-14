import useMainState from '@redux/hooks/useMainState';
import { Item, IsActive } from '@utils/CustomInterfaces';
import { getCurrentGame } from '@utils/hooks/useGetCurrentGameData.native';

interface GetUserGameDataReturnType {
  getUserQuests: () => Item[];
  getUserCollectables: () => Item[];
  getUserLocations: () => Item[];
  getUserMiscItems: () => Item[];
  getUserSettingsMainConfig: () => IsActive[];
  getUserSettingsSubConfig: (section: string) => IsActive[];
  getUserSettingsDLC: (section: string) => IsActive[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGame, selectedGameSettings } = useMainState();
  const currentGame = getCurrentGame(selectedGameSettings, user);

  const getUserQuests = (): Item[] => {
    return !!selectedGame
      ? selectedGame?.quests.filter(item => item.isComplete)
      : [];
  };

  const getUserCollectables = (): Item[] => {
    return !!selectedGame
      ? selectedGame?.collectables.filter(item => item.isComplete)
      : [];
  };

  const getUserLocations = (): Item[] => {
    return !!selectedGame
      ? selectedGame?.locations.filter(item => item.isComplete)
      : [];
  };

  const getUserMiscItems = (): Item[] => {
    return !!selectedGame
      ? selectedGame?.miscellaneous.filter(item => item.isComplete)
      : [];
  };

  const getUserSettingsMainConfig = (): IsActive[] => {
    return currentGame?.settingsConfig.general?.map(item => item.section) ?? [];
  }

  const getUserSettingsSubConfig = (section: string): IsActive[] => {
    return currentGame?.settingsConfig.general?.find(item => item.section.id === section)?.categories ?? [];
  }

  const getUserSettingsDLC = (section: string): IsActive[] => {
    return currentGame?.settingsConfig.general?.find(item => item.section.id === section)?.dlc ?? [];
  }

  return {
    getUserQuests,
    getUserCollectables,
    getUserLocations,
    getUserMiscItems,
    getUserSettingsMainConfig,
    getUserSettingsSubConfig,
    getUserSettingsDLC
  }
};

export default useGetUserGameData;