import { ContentSectionEnum } from '@utils/custom-enums';
import { GameContentItem, GameContentState } from '@utils/custom-interfaces';

export const mapDataToQuests = (
  gameData: GameContentItem[],
): GameContentItem[] =>
  gameData
    ?.filter(
      (item: GameContentItem) => item.section === ContentSectionEnum.QUESTS,
    )
    .map((quest: GameContentItem) => quest as GameContentItem);

export const mapDataToCollectables = (
  gameData: GameContentItem[],
): GameContentItem[] =>
  gameData
    ?.filter(
      (item: GameContentItem) =>
        item.section === ContentSectionEnum.COLLECTABLES,
    )
    .map((collectable: GameContentItem) => collectable as GameContentItem);

export const mapDataToMiscItems = (
  gameData: GameContentItem[],
): GameContentItem[] =>
  gameData
    ?.filter(
      (item: GameContentItem) =>
        item.section === ContentSectionEnum.MISCELLANEOUS,
    )
    .map((miscItem: Partial<GameContentItem>) => miscItem as GameContentItem);

export const mapDataToLocations = (
  gameData: GameContentItem[],
): GameContentItem[] =>
  gameData
    ?.filter(
      (item: GameContentItem) => item.section === ContentSectionEnum.LOCATIONS,
    )
    .map((location: Partial<GameContentItem>) => location as GameContentItem);

export const getMappedGameData = (
  gameData: GameContentItem[],
): GameContentState => {
  return {
    quests: mapDataToQuests(gameData),
    collectables: mapDataToCollectables(gameData),
    locations: mapDataToLocations(gameData),
    miscellaneous: mapDataToMiscItems(gameData),
  };
};
