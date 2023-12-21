import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Item, SettingsConfigItem } from '@utils/CustomInterfaces';

interface GetUserGameDataReturnType {
  getUserQuests: () => Item[];
  getUserCollectables: () => Item[];
  getUserLocations: () => Item[];
  getUserMiscItems: () => Item[];
  getUserSettingsConfig: () => SettingsConfigItem[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGame, selectedGameSettings } = useMainState();

  const getUserQuests = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.quests;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.quests;
      default:
        return [];
    }
  };

  const getUserCollectables = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.collectables;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.collectables;
      default:
        return [];
    }
  };

  const getUserLocations = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.locations;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.locations;
      default:
        return [];
    }
  };

  const getUserMiscItems = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data?.skyrim?.miscellaneous;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data?.fallout4?.miscellaneous;
      default:
        return [];
    }
  };

  const getUserSettingsConfig = (): SettingsConfigItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.settingsConfig;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.settingsConfig;
      default:
        return [];
    }
  }

  return {
    getUserQuests,
    getUserCollectables,
    getUserLocations,
    getUserMiscItems,
    getUserSettingsConfig
  }
};

export default useGetUserGameData;