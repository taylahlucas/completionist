import skyrim_quests from '../../../backend/database/skyrim/skyrim_quests.json';
import skyrim_collectables from '../../../backend/database/skyrim/skyrim_collectables.json';
import skyrim_locations from '../../../backend/database/skyrim/skyrim_locations.json';
import skyrim_misc from '../../../backend/database/skyrim/skyrim_misc.json';
import fallout4_quests from '../../../backend/database/fallout4/fallout4_quests.json';
import fallout4_locations from '../../../backend/database/fallout4/fallout4_locations.json';
import fallout4_collectables from '../../../backend/database/fallout4/fallout4_collectables.json';
import fallout4_misc from '../../../backend/database/fallout4/fallout4_misc.json';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Collectable, Location, MiscItem, Quest, SettingsConfigItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface GameDataReturnType {
  mapDataToQuests: (selectedGame?: SubscriptionTypeEnum) => Quest[];
  mapDataToFilteredQuests: (selectedGame?: SubscriptionTypeEnum) => Quest[];
  mapDataToCollectables: (selectedGame?: SubscriptionTypeEnum) => Collectable[];
  mapDataToFilteredCollectables: (selectedGame?: SubscriptionTypeEnum) => Collectable[];
  mapDataToLocations: (selectedGame?: SubscriptionTypeEnum) => Location[];
  mapDataToFilteredLocations: (selectedGame?: SubscriptionTypeEnum) => Location[];
  mapDataToMiscItems: (selectedGame?: SubscriptionTypeEnum) => MiscItem[];
  mapDataToFilteredMiscItems: (selectedGame?: SubscriptionTypeEnum) => MiscItem[];
}

const useGetGameData = (): GameDataReturnType => {
  const { user } = useMainState();

  const filterData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.isActive);
    // TODO: Only working for quests ? amounts not wokring
    filteredConfig.map(config => {
      data = data.filter(item => item.mainCategory !== config.category);
    });
    
    return data;
  }

  const mapDataToQuests = (selectedGame?: SubscriptionTypeEnum): Quest[] => {
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

  const mapDataToFilteredQuests = (selectedGame?: SubscriptionTypeEnum): Quest[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        let skyrimQuests = skyrim_quests.map((quest: Quest) => {
          return quest as Quest;
        });
        return filterData(user.data.skyrim.settingsConfig, skyrimQuests);
      case SubscriptionTypeEnum.FALLOUT_4:
        let fallout4Quests = fallout4_quests.map((quest: Quest) => {
          return quest as Quest;
        });
        return filterData(user.data.fallout4.settingsConfig, fallout4Quests);
      default: 
        return [];   
    }
  };

  const mapDataToCollectables = (selectedGame?: SubscriptionTypeEnum): Collectable[] => {
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

  const mapDataToFilteredCollectables = (selectedGame?: SubscriptionTypeEnum): Collectable[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        let skyrimCollectables = skyrim_collectables.map((collectable: Collectable) => {
          return collectable as Collectable
        });
        return filterData(user.data.skyrim.settingsConfig, skyrimCollectables);
      case SubscriptionTypeEnum.FALLOUT_4:
        let fallout4Collectables = fallout4_collectables.map((collectable: Collectable) => {
          return collectable as Collectable
        });
        return filterData(user.data.fallout4.settingsConfig, fallout4Collectables);
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems = (selectedGame?: SubscriptionTypeEnum): MiscItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_misc.map((miscItem: MiscItem) => {
          return miscItem as MiscItem
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_misc.map((miscItem: MiscItem) => {
          return miscItem as MiscItem
        });
      default: 
        return [];   
    }
  };

  const mapDataToFilteredMiscItems = (selectedGame?: SubscriptionTypeEnum): MiscItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        let skyrimMisc = skyrim_misc.map((miscItem: MiscItem) => {
          return miscItem as MiscItem
        });
        return filterData(user.data.skyrim.settingsConfig, skyrimMisc);
      case SubscriptionTypeEnum.FALLOUT_4:
        let fallout4Misc = fallout4_misc.map((miscItem: MiscItem) => {
          return miscItem as MiscItem
        });
        return filterData(user.data.fallout4.settingsConfig, fallout4Misc);
      default: 
        return [];   
    }
  };
  
  const mapDataToLocations = (selectedGame?: SubscriptionTypeEnum): Location[] => {
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

  const mapDataToFilteredLocations = (selectedGame?: SubscriptionTypeEnum): Location[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        let skyrimLocations = skyrim_locations.map((location: Location) => {
          return location as Location
        });
        return filterData(user.data.skyrim.settingsConfig, skyrimLocations);
      case SubscriptionTypeEnum.FALLOUT_4:
        let fallout4Locations = fallout4_locations.map((location: Location) => {
          return location as Location
        });
        return filterData(user.data.fallout4.settingsConfig, fallout4Locations);
      default: 
        return [];   
    }
  };

  return {
    mapDataToQuests,
    mapDataToFilteredQuests,
    mapDataToCollectables,
    mapDataToFilteredCollectables,
    mapDataToLocations,
    mapDataToFilteredLocations,
    mapDataToMiscItems,
    mapDataToFilteredMiscItems
  }
};

export default useGetGameData;