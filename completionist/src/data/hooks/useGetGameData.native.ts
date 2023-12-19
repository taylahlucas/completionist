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
  mapDataToQuests: () => Quest[];
  mapDataToCollectables: () => Collectable[];
  mapDataToMiscItems: () => MiscItem[];
  mapDataToLocations: () => Location[];
}

const useGetGameData = (selectedGame: SubscriptionTypeEnum = SubscriptionTypeEnum.SKYRIM): GameDataReturnType => {
  const { user } = useMainState();

  const filterData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.isActive);
    filteredConfig.map(config => {
      data = data.filter(item => item.mainCategory !== config.category);
    })
    return data;
  }

  const mapDataToQuests = (): Quest[] => {
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
        return filterData(user.data.skyrim.settingsConfig, fallout4Quests);
      default: 
        return [];   
    }
  };

  const mapDataToCollectables = (): Collectable[] => {
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
        return filterData(user.data.skyrim.settingsConfig, fallout4Collectables);
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems = (): MiscItem[] => {
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
        return filterData(user.data.skyrim.settingsConfig, fallout4Misc);
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