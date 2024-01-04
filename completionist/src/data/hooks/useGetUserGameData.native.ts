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
  const { user, selectedGame, selectedGameSettings } = useMainState();

  const getUserQuests = (): Item[] => {
    // TODO: Refactor all functions to use getDataForSelectedGame;
    // const data = getDataForSelectedGame();
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.quests.filter(item => item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.quests.filter(item => item.isComplete);
      default:
        return [];
    }
  };

  const getUserCollectables = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.collectables.filter(item => item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.collectables.filter(item => item.isComplete);
      default:
        return [];
    }
  };

  const getUserLocations = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.locations.filter(item => item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.locations.filter(item => item.isComplete);
      default:
        return [];
    }
  };

  const getUserMiscItems = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.miscellaneous.filter(item => item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.miscellaneous.filter(item => item.isComplete);
      default:
        return [];
    }
  };

  const getUserSettingsMainConfig = (): SettingsConfigItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim?.settingsConfig.filter(item => item.category === "");
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4?.settingsConfig.filter(item => item.category === "");
      default:
        return [];
    }
  }

  const getUserSettingsSubConfig = (section: string): SettingsConfigItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim?.settingsConfig.filter(item => item.section === section && item.category !== "");
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4?.settingsConfig.filter(item => item.section === section && item.category !== "");
      default:
        return [];
    }
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