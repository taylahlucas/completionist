import skyrim_quests from '../../../backend/database/skyrim/skyrim_quests.json';
import skyrim_collectables from '../../../backend/database/skyrim/skyrim_collectables.json';
import skyrim_locations from '../../../backend/database/skyrim/skyrim_locations.json';
import skyrim_misc from '../../../backend/database/skyrim/skyrim_misc.json';
import fallout4_quests from '../../../backend/database/fallout4/fallout4_quests.json';
import fallout4_locations from '../../../backend/database/fallout4/fallout4_locations.json';
import fallout4_collectables from '../../../backend/database/fallout4/fallout4_collectables.json';
import fallout4_misc from '../../../backend/database/fallout4/fallout4_misc.json';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Collectable, Location, MiscItem, Quest } from '@utils/CustomInterfaces';

interface GameDataReturnType {
  mapDataToQuests: () => Quest[];
  mapDataToCollectables: () => Collectable[];
  mapDataToMiscItems: () => MiscItem[];
  mapDataToLocations: () => Location[];
}

const useGetGameData = (selectedGame: SubscriptionTypeEnum = SubscriptionTypeEnum.SKYRIM): GameDataReturnType => {

  const mapDataToQuests = (): Quest[] => {
    switch (selectedGame) {
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
    switch (selectedGame) {
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

  const mapDataToMiscItems = (): MiscItem[] => {
    switch (selectedGame) {
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

  const mapDataToLocations = (): Location[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_locations.map((location: Location) => {
          return location as Location;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_locations.map((location: Location) => {
          return location as Location;
        });
      default: 
        return [];   
    }
  };

  return {
    mapDataToQuests,
    mapDataToCollectables,
    mapDataToMiscItems,
    mapDataToLocations
  }
};

export default useGetGameData;