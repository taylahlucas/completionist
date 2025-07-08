import { ContentSectionEnum, GameContentItem, GameData } from '@utils/index';

export const isGameItemComplete = (
  section: ContentSectionEnum,
  id: string,
  selectedGame: GameData,
): boolean => {
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return !!selectedGame.quests.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.COLLECTABLES:
      return !!selectedGame.collectables.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.LOCATIONS:
      return !!selectedGame.locations.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.MISCELLANEOUS:
      return !!selectedGame.miscellaneous.find(
        item => item.id === id && item.isComplete,
      );
    default:
      return false;
  }
};

export const isGameItemCompleteForCategory = (
  section: ContentSectionEnum,
  items: GameContentItem[],
  selectedGame: GameData,
): number => {
  let count = 0;
  switch (section) {
    case ContentSectionEnum.QUESTS:
      selectedGame?.quests.forEach(quest => {
        items.forEach(item => {
          if (quest.id === item.id && quest.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.COLLECTABLES:
      selectedGame?.collectables.forEach(collectable => {
        items.forEach(item => {
          if (collectable.id === item.id && collectable.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.LOCATIONS:
      selectedGame?.locations.forEach(location => {
        items.forEach(item => {
          if (location.id === item.id && location.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.MISCELLANEOUS:
      selectedGame?.miscellaneous.forEach(miscItem => {
        items.forEach(item => {
          if (miscItem.id === item.id && miscItem.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    default:
      return 0;
  }
};
