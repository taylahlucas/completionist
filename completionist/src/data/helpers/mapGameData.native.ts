import { ContentSectionEnum } from '@utils/CustomEnums';
import { GameContentItem, SettingsConfigItem } from '@utils/CustomInterfaces';
import { filterActiveSections } from './filterActiveSections.native';

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

// TOOD: Find another way to handle filter for active sections
export const mapGameDataTo = (
  type: ContentSectionEnum,
  gameData?: GameContentItem[],
  settingsConfig?: SettingsConfigItem[],
  filter = false,
): GameContentItem[] => {
  if (!gameData) {
    return [];
  }
  switch (type) {
    case ContentSectionEnum.QUESTS:
      const quests = mapDataToQuests(gameData);
      return !filter
        ? quests
        : filterActiveSections(settingsConfig ?? [], quests);

    case ContentSectionEnum.COLLECTABLES:
      const collectables = mapDataToCollectables(gameData);
      return !filter
        ? collectables
        : filterActiveSections(settingsConfig ?? [], collectables);

    case ContentSectionEnum.LOCATIONS:
      const locations = mapDataToLocations(gameData);
      return !filter
        ? locations
        : filterActiveSections(settingsConfig ?? [], locations);

    case ContentSectionEnum.MISCELLANEOUS:
      const miscItems = mapDataToMiscItems(gameData);
      return !filter
        ? miscItems
        : filterActiveSections(settingsConfig ?? [], miscItems);

    default:
      return [];
  }
};
