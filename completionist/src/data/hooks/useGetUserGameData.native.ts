import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Item } from '@utils/CustomInterfaces';

interface GetUserGameDataReturnType {
  getUserQuests: () => Item[];
  getUserCollectables: () => Item[];
  getUserLocations: () => Item[];
  getUserMiscItems: () => Item[];
}

const useGetUserGameData = (): GetUserGameDataReturnType => {
  const { user, selectedGame } = useMainState();

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

  return {
    getUserQuests,
    getUserCollectables,
    getUserLocations,
    getUserMiscItems
  }
};

export default useGetUserGameData;