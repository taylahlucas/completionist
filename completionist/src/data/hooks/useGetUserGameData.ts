import useMainState from '@redux/hooks/useMainState';
import { Item, IsActive } from '@utils/CustomInterfaces';
import { getCurrentGame } from '@utils/hooks/useGetCurrentGameData.native';

interface GetUserGameDataReturnType {
  userQuests: Item[];
  userCollectables: Item[];
  userLocations: Item[];
  userMiscItems: Item[];
  userSettingsMainConfig: IsActive[];
  getUserSettingsSubConfig: (section: string) => IsActive[];
  getUserSettingsDLC: (section: string) => IsActive[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGame, selectedGameSettings } = useMainState();
  const currentGame = getCurrentGame(selectedGameSettings, user);

  const userQuests: Item[] = !!selectedGame
  ? selectedGame?.quests.filter(item => item.isComplete)
  : [];
  const userCollectables: Item[] = !!selectedGame
  ? selectedGame?.collectables.filter(item => item.isComplete)
  : [];
  const userLocations: Item[] = !!selectedGame
  ? selectedGame?.locations.filter(item => item.isComplete)
  : [];
  const userMiscItems: Item[] = !!selectedGame
  ? selectedGame?.miscellaneous.filter(item => item.isComplete)
  : [];
  const userSettingsMainConfig = currentGame?.settingsConfig.general?.map(item => item.section) ?? [];
  
  const getUserSettingsSubConfig = (section: string): IsActive[] => {
    return currentGame?.settingsConfig.general?.find(item => item.section.id === section)?.categories ?? [];
  }

  const getUserSettingsDLC = (section: string): IsActive[] => {
    return currentGame?.settingsConfig.general?.find(item => item.section.id === section)?.dlc ?? [];
  }

  return {
    userQuests,
    userCollectables,
    userLocations,
    userMiscItems,
    userSettingsMainConfig,
    getUserSettingsSubConfig,
    getUserSettingsDLC
  }
};

export default useGetUserGameData;