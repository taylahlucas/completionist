import useMainState from '@redux/hooks/useMainState';
import { GameContentItem } from '@utils/CustomInterfaces';
import { ContentSectionEnum } from '@utils/CustomEnums';
import { useContentState } from '../provider';

interface CheckContentCompleteReturnType {
  checkContentComplete: (id: string) => boolean;
  checkContentCompleteForCategory: (collectables: GameContentItem[]) => number;
}

export const useCheckContentComplete = (): CheckContentCompleteReturnType => {
  const { selectedGame } = useMainState();
  const { sectionType } = useContentState();

  const checkContentComplete = (id: string): boolean => {
    switch (sectionType) {
      case ContentSectionEnum.QUESTS:
        return !!selectedGame?.quests.find(
          item => item.id === id && item.isComplete,
        );
      case ContentSectionEnum.COLLECTABLES:
        return !!selectedGame?.collectables.find(
          item => item.id === id && item.isComplete,
        );
      case ContentSectionEnum.LOCATIONS:
        return !!selectedGame?.locations.find(
          item => item.id === id && item.isComplete,
        );
      case ContentSectionEnum.MISCELLANEOUS:
        return !!selectedGame?.miscellaneous.find(
          item => item.id === id && item.isComplete,
        );
      default:
        return false;
    }
  };

  const checkContentCompleteForCategory = (
    items: GameContentItem[],
  ): number => {
    let count = 0;
    switch (sectionType) {
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

  return { checkContentComplete, checkContentCompleteForCategory };
};
