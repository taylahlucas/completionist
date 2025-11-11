import { getCurrentGame } from '@data/helpers';
import { User, ContentSectionEnum, GameKeyEnum } from '@utils/index';

export const getGameProgressForSection = (
  id: GameKeyEnum,
  section: string,
  user: User,
): number => {
  const currentGame = getCurrentGame(id, user);
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return currentGame?.quests.filter(item => item.isComplete).length ?? 0;
    case ContentSectionEnum.COLLECTABLES:
      return (
        currentGame?.collectables.filter(item => item.isComplete).length ?? 0
      );
    case ContentSectionEnum.LOCATIONS:
      return currentGame?.locations.filter(item => item.isComplete).length ?? 0;
    case ContentSectionEnum.MISCELLANEOUS:
      return (
        currentGame?.miscellaneous.filter(item => item.isComplete).length ?? 0
      );
    default:
      return 0;
  }
};
