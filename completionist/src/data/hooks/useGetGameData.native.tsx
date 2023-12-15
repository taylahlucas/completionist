import skyrim_quests from '../../../backend/database/skyrim_quests.json';
import skyrim_collectables from '../../../backend/database/skyrim_collectables.json';
import skyrim_misc from '../../../backend/database/skyrim_misc.json';
import fallout4_quests from '../../../backend/database/fallout4_quests.json';
import fallout4_collectables from '../../../backend/database/fallout4_collectables.json';
import fallout4_misc from '../../../backend/database/fallout4_misc.json';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Collectable, MiscItem, Quest } from '@utils/CustomInterfaces';

// TODO: Add return type
const useGetGameData = () => {
  const mapDataToQuests = (game: SubscriptionTypeEnum): Quest[] => {
    switch (game) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_quests.map((quest: Quest) => {
          return quest as Quest;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_quests.map((quest: Quest) => {
          return quest as Quest;
        });
      default: 
        return [];   
    }
  };

  const mapDataToCollectables = (game: SubscriptionTypeEnum): Collectable[] => {
    switch (game) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_collectables.map((collectable: Collectable) => {
          return collectable as Collectable
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_collectables.map((collectable: Collectable) => {
          return collectable as Collectable
        });
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems= (game: SubscriptionTypeEnum): MiscItem[] => {
    switch (game) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_misc.map((collectable: Collectable) => {
          return collectable as Collectable
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_misc.map((collectable: Collectable) => {
          return collectable as Collectable
        });
      default: 
        return [];   
    }
  };

  // const mapDataToLocations (game: SubscriptionTypeEnum): MiscItem[] => {
  //   switch (game) {
  //     case SubscriptionTypeEnum.SKYRIM:
  //       return skyrim_misc.map((collectable: Collectable) => {
  //         return collectable as Collectable
  //       });
  //     case SubscriptionTypeEnum.FALLOUT_4:
  //       return fallout4_misc.map((collectable: Collectable) => {
  //         return collectable as Collectable
  //       });
  //     default: 
  //       return [];   
  //   }
  // };

  return {
    mapDataToQuests,
    mapDataToCollectables,
    mapDataToMiscItems
  }
};

export default useGetGameData;