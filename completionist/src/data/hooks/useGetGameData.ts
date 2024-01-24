import skyrim_quests from '../../../backend/database/skyrim/skyrim_quests.json';
import skyrim_collectables from '../../../backend/database/skyrim/skyrim_collectables.json';
import skyrim_locations from '../../../backend/database/skyrim/skyrim_locations.json';
import skyrim_misc from '../../../backend/database/skyrim/skyrim_misc.json';
import fallout4_quests from '../../../backend/database/fallout4/fallout4_quests.json';
import fallout4_locations from '../../../backend/database/fallout4/fallout4_locations.json';
import fallout4_collectables from '../../../backend/database/fallout4/fallout4_collectables.json';
import fallout4_misc from '../../../backend/database/fallout4/fallout4_misc.json';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { GameContentItem, SettingsConfigItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import { ContentSection } from '@utils/CustomTypes';

interface GameDataReturnType {
  mapDataTo: (type: ContentSection, selectedGame?: SubscriptionTypeEnum, filter?: boolean) => GameContentItem[];
  // mapDataToQuests: (selectedGame?: SubscriptionTypeEnum) => Quest[];
  // mapDataToCollectables: (selectedGame?: SubscriptionTypeEnum) => Collectable[];
  // mapDataToLocations: (selectedGame?: SubscriptionTypeEnum) => Location[];
  // mapDataToMiscItems: (selectedGame?: SubscriptionTypeEnum) => MiscItem[];
}

const useGetGameData = (): GameDataReturnType => {
  const { user, selectedGameData } = useMainState();

  const filterData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.isActive);

    filteredConfig.map(config => {
      data = data.filter(item => item.mainCategory !== config.category);
    });
    
    return data;
  }

  const filterLocationData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.isActive);
    
    filteredConfig.map(config => {
      data = data.filter(item => item.dlc !== config.category);
    });
    
    return data;
  }

  const mapDataTo = (type: ContentSection, selectedGame?: SubscriptionTypeEnum, filter = false): GameContentItem[] => {
    switch (type) {
      case 'Quests':
        const quests = mapDataToQuests(selectedGame);
        return !filter ? quests : filterData(selectedGameData?.settingsConfig ?? [], quests);

      case 'Collectables':
        const collectables = mapDataToCollectables(selectedGame);
        return !filter ? collectables : filterData(selectedGameData?.settingsConfig ?? [], collectables);

      case 'Locations':
        const locations = mapDataToLocations(selectedGame);
        return !filter ? locations : filterData(selectedGameData?.settingsConfig ?? [], locations);
      case 'Miscellaneous':
        const miscItems = mapDataToMiscItems(selectedGame);
        return !filter ? miscItems : filterData(selectedGameData?.settingsConfig ?? [], miscItems);
      default:
        return []
    }
  };

  const mapDataToQuests = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_quests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_quests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });
      default: 
        return [];   
    }
  };

  const mapDataToCollectables = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_collectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_collectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_misc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_misc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });
      default: 
        return [];   
    }
  };
  
  const mapDataToLocations = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrim_locations.map((location: Partial<GameContentItem>) => {
          return location as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4_locations.map((location: Partial<GameContentItem>) => {
          return location as GameContentItem;
        });
      default: 
        return [];   
    }
  };

  return {
    mapDataTo
  }
};

export default useGetGameData;