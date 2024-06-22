import useMainState from '@redux/hooks/useMainState';
import { Item, SettingsListItem } from '@utils/CustomInterfaces';

interface GetUserGameDataReturnType {
  getUserQuests: () => Item[];
  getUserCollectables: () => Item[];
  getUserLocations: () => Item[];
  getUserMiscItems: () => Item[];
  getUserSettingsMainConfig: () => SettingsListItem[];
  getUserSettingsSubConfig: (section: string) => SettingsListItem[];
  getUserSettingsDLC: (section: string) => SettingsListItem[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGameData, selectedGameSettings } = useMainState();

  const getUserQuests = (): Item[] => {
    return !!selectedGameData
      ? selectedGameData?.quests.filter(item => item.isComplete)
      : [];
  };

  const getUserCollectables = (): Item[] => {
    return !!selectedGameData
      ? selectedGameData?.collectables.filter(item => item.isComplete)
      : [];
  };

  const getUserLocations = (): Item[] => {
    return !!selectedGameData
      ? selectedGameData?.locations.filter(item => item.isComplete)
      : [];
  };

  const getUserMiscItems = (): Item[] => {
    return !!selectedGameData
      ? selectedGameData?.miscellaneous.filter(item => item.isComplete)
      : [];
  };

  const getUserSettingsMainConfig = (): SettingsListItem[] => {
    return user.gameData[selectedGameSettings]?.settingsConfig.general?.map(item => item.section);
  }

  const getUserSettingsSubConfig = (section: string): SettingsListItem[] => {
    return user.gameData[selectedGameSettings]?.settingsConfig.general?.find(item => item.section.id === section)?.categories ?? [];
  }

  const getUserSettingsDLC = (section: string): SettingsListItem[] => {
    return user.gameData[selectedGameSettings]?.settingsConfig.general?.find(item => item.section.id === section)?.dlc ?? [];
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