import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Item, SettingsConfigItem } from '@utils/CustomInterfaces';

interface GetUserGameDataReturnType {
  getUserQuests: () => Item[];
  getUserCollectables: () => Item[];
  getUserLocations: () => Item[];
  getUserMiscItems: () => Item[];
  getUserSettingsMainConfig: () => SettingsConfigItem[];
  getUserSettingsSubConfig: (section: string) => SettingsConfigItem[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { selectedGameData } = useMainState();

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

  const getUserSettingsMainConfig = (): SettingsConfigItem[] => {
    return !!selectedGameData
      ? selectedGameData?.settingsConfig.filter(item => item.category === "")
      : [];
  }

  const getUserSettingsSubConfig = (section: string): SettingsConfigItem[] => {
    return !!selectedGameData
      ? selectedGameData?.settingsConfig.filter(item => item.section === section && item.category !== "")
      : [];
  }

  return {
    getUserQuests,
    getUserCollectables,
    getUserLocations,
    getUserMiscItems,
    getUserSettingsMainConfig,
    getUserSettingsSubConfig
  }
};

export default useGetUserGameData;