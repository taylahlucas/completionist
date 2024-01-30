import { SubscriptionTypeEnum, ContentSectionEnum } from '@utils/CustomEnums';
import { GameContentItem, SettingsConfigItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useGetTranslatedGameData from './useGetTranslatedGameData.native';

interface GameDataReturnType {
  mapDataTo: (type: ContentSectionEnum, selectedGame?: SubscriptionTypeEnum, filter?: boolean) => GameContentItem[];
}

const useGetGameData = (): GameDataReturnType => {
  const {
    skyrimQuests,
    skyrimCollectables,
    skyrimLocations,
    skyrimMisc,

    fallout4Quests,
    fallout4Collectables,
    fallout4Locations,
    fallout4Misc
  } = useGetTranslatedGameData();
  const { selectedGameData } = useMainState();

  const filterData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.isActive);

    filteredConfig.map(config => {
      data = data.filter(item => item.mainCategory !== config.category);
    });
    
    return data;
  }

  const mapDataTo = (type: ContentSectionEnum, selectedGame?: SubscriptionTypeEnum, filter = false): GameContentItem[] => {
    switch (type) {
      case ContentSectionEnum.QUESTS:
        const quests = mapDataToQuests(selectedGame);
        return !filter ? quests : filterData(selectedGameData?.settingsConfig ?? [], quests);

      case ContentSectionEnum.COLLECTABLES:
        const collectables = mapDataToCollectables(selectedGame);
        return !filter ? collectables : filterData(selectedGameData?.settingsConfig ?? [], collectables);

      case ContentSectionEnum.LOCATIONS:
        const locations = mapDataToLocations(selectedGame);
        return !filter ? locations : filterData(selectedGameData?.settingsConfig ?? [], locations);
      case ContentSectionEnum.MISCELLANEOUS:
        const miscItems = mapDataToMiscItems(selectedGame);
        return !filter ? miscItems : filterData(selectedGameData?.settingsConfig ?? [], miscItems);
      default:
        return []
    }
  };

  const mapDataToQuests = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimQuests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4Quests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });
      default: 
        return [];   
    }
  };

  const mapDataToCollectables = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimCollectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4Collectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimMisc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4Misc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });
      default: 
        return [];   
    }
  };
  
  const mapDataToLocations = (selectedGame?: SubscriptionTypeEnum): GameContentItem[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimLocations.map((location: Partial<GameContentItem>) => {
          return location as GameContentItem;
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4Locations.map((location: Partial<GameContentItem>) => {
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