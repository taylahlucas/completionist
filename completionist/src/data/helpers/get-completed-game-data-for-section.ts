import { ContentSectionEnum } from '@utils/custom-enums';
import { GameData, Item } from '@utils/custom-interfaces';

export const getCompletedGameDataForSection = (
  section: ContentSectionEnum,
  selectedGame?: GameData,
): Item[] => {
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return selectedGame
        ? selectedGame?.quests.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.COLLECTABLES:
      return selectedGame
        ? selectedGame?.collectables.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.LOCATIONS:
      return selectedGame
        ? selectedGame?.locations.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.MISCELLANEOUS:
      return selectedGame
        ? selectedGame?.miscellaneous.filter(item => item.isComplete)
        : [];
    default:
      return [];
  }
};
