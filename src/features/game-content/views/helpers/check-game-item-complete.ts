import { ContentSectionEnum, GameContentItem, GameData } from '@utils/index';

export const isGameItemComplete = (
  section: ContentSectionEnum,
  id: string,
  selectedGameData?: GameData,
): boolean => {
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return !!selectedGameData?.quests.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.COLLECTABLES:
      return !!selectedGameData?.collectables.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.LOCATIONS:
      return !!selectedGameData?.locations.find(
        item => item.id === id && item.isComplete,
      );
    case ContentSectionEnum.MISCELLANEOUS:
      return !!selectedGameData?.miscellaneous.find(
        item => item.id === id && item.isComplete,
      );
    default:
      return false;
  }
};

export const isGameItemCompleteForCategory = (
  section: ContentSectionEnum,
  items: GameContentItem[],
  selectedGameData?: GameData,
): number => {
  let count = 0;
  switch (section) {
    case ContentSectionEnum.QUESTS:
      selectedGameData?.quests.forEach(quest => {
        items.forEach(item => {
          if (quest.id === item.id && quest.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.COLLECTABLES:
      selectedGameData?.collectables.forEach(collectable => {
        items.forEach(item => {
          if (collectable.id === item.id && collectable.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.LOCATIONS:
      selectedGameData?.locations.forEach(location => {
        items.forEach(item => {
          if (location.id === item.id && location.isComplete) {
            count += 1;
          }
        });
      });
      return count;
    case ContentSectionEnum.MISCELLANEOUS:
      selectedGameData?.miscellaneous.forEach(miscItem => {
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
