import { GameContentItem, GameContentState } from '@utils/CustomInterfaces';
import {
  mapDataToQuests,
  mapDataToCollectables,
  mapDataToLocations,
  mapDataToMiscItems,
} from '@data/helpers/mapGameData.native';

// TODO: Make selectedGame not optional and update with filterActiveSections
export const useGetGameData = () => {
  const getMappedGameData = (gameData: GameContentItem[]): GameContentState => {
    return {
      quests: mapDataToQuests(gameData),
      collectables: mapDataToCollectables(gameData),
      locations: mapDataToLocations(gameData),
      miscellaneous: mapDataToMiscItems(gameData),
    };
  };

  return {
    getMappedGameData,
  };
};
