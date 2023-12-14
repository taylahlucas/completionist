import skyrim_quests from '../../../backend/database/skyrim_quests.json';
import fallout4_quests from '../../../backend/database/fallout4_quests.json';
import skyrim_collectables from '../../../backend/database/skyrim_collectables.json';
import skyrim_misc from '../../../backend/database/skyrim_misc.json';
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

  const mapDataToCollectables = (): Collectable[] => {
    return skyrim_collectables.map((collectable: Collectable) => {
    return collectable as Collectable
    });
  };

  const mapDataToMiscItems= (): MiscItem[] => {
    return skyrim_misc.map((item: MiscItem) => {
    return item as MiscItem
    });
  };

  return {
    mapDataToQuests,
    mapDataToCollectables,
    mapDataToMiscItems
  }
};

export default useGetGameData;