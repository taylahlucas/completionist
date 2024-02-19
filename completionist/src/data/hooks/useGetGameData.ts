import { GameKeyEnum, ContentSectionEnum } from '@utils/CustomEnums';
import { GameContentItem, SettingsConfigItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useGetTranslatedGameData from './useGetTranslatedGameData.native';

interface GameDataReturnType {
  mapDataTo: (type: ContentSectionEnum, selectedGame?: GameKeyEnum, filter?: boolean) => GameContentItem[];
}

const useGetGameData = (): GameDataReturnType => {
  const {
    fallout4Quests,
    fallout4Collectables,
    fallout4Locations,
    fallout4Misc,

		skyrimQuests,
    skyrimCollectables,
    skyrimLocations,
    skyrimMisc,

		witcher3Quests,
		witcher3Collectables,
		witcher3Locations
  } = useGetTranslatedGameData();
  const { selectedGameData } = useMainState();

	// Filter active sections
  const filterData = (config: SettingsConfigItem[], data: any[]) => {
    const filteredConfig = config.filter(item => !item.section.isActive);
    filteredConfig.map(config => {
      data = data.filter(item => item.mainCategory !== config.section);
    });
    
    return data;
  }

  const mapDataTo = (type: ContentSectionEnum, selectedGame?: GameKeyEnum, filter = false): GameContentItem[] => {
    switch (type) {
      case ContentSectionEnum.QUESTS:
        const quests = mapDataToQuests(selectedGame);
        return !filter ? quests : filterData(selectedGameData?.settingsConfig.general ?? [], quests);

      case ContentSectionEnum.COLLECTABLES:
        const collectables = mapDataToCollectables(selectedGame);
        return !filter ? collectables : filterData(selectedGameData?.settingsConfig.general ?? [], collectables);

      case ContentSectionEnum.LOCATIONS:
        const locations = mapDataToLocations(selectedGame);
        return !filter ? locations : filterData(selectedGameData?.settingsConfig.general ?? [], locations);

      case ContentSectionEnum.MISCELLANEOUS:
        const miscItems = mapDataToMiscItems(selectedGame);
        return !filter ? miscItems : filterData(selectedGameData?.settingsConfig.general ?? [], miscItems);

      default:
        return []
    }
  };

  const mapDataToQuests = (selectedGame?: GameKeyEnum): GameContentItem[] => {
    switch (selectedGame) {
			case GameKeyEnum.FALLOUT_4:
        return fallout4Quests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });

      case GameKeyEnum.SKYRIM:
        return skyrimQuests.map((quest: GameContentItem) => {
          return quest as GameContentItem;
        });

			case GameKeyEnum.WITCHER_3:
				return witcher3Quests.map((quest: GameContentItem) => {
					return quest as GameContentItem;
				});
      default:
        return [];   
    }
  };

  const mapDataToCollectables = (selectedGame?: GameKeyEnum): GameContentItem[] => {
    switch (selectedGame) {
			case GameKeyEnum.FALLOUT_4:
        return fallout4Collectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });

      case GameKeyEnum.SKYRIM:
        return skyrimCollectables.map((collectable: Partial<GameContentItem>) => {
          return collectable as GameContentItem;
        });
		
			case GameKeyEnum.WITCHER_3:
				return witcher3Collectables.map((collectable: Partial<GameContentItem>) => {
					return collectable as GameContentItem;
				});
      default: 
        return [];   
    }
  };

  const mapDataToMiscItems = (selectedGame?: GameKeyEnum): GameContentItem[] => {
    switch (selectedGame) {
			case GameKeyEnum.FALLOUT_4:
        return fallout4Misc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });

      case GameKeyEnum.SKYRIM:
        return skyrimMisc.map((miscItem: Partial<GameContentItem>) => {
          return miscItem as GameContentItem
        });
      default: 
        return [];   
    }
  };
  
  const mapDataToLocations = (selectedGame?: GameKeyEnum): GameContentItem[] => {
    switch (selectedGame) {
			case GameKeyEnum.FALLOUT_4:
        return fallout4Locations.map((location: Partial<GameContentItem>) => {
          return location as GameContentItem;
        });

      case GameKeyEnum.SKYRIM:
        return skyrimLocations.map((location: Partial<GameContentItem>) => {
          return location as GameContentItem;
        });
			
			case GameKeyEnum.WITCHER_3:
				return witcher3Locations.map((miscItem: Partial<GameContentItem>) => {
					return miscItem as GameContentItem
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