import useMainState from '@redux/hooks/useMainState';
import { GameContentItem } from '@utils/CustomInterfaces';
import { ContentSection } from '@utils/CustomTypes';

interface CheckContentCompleteReturnType {
  checkContentComplete: (id: string) => boolean;
  checkContentCompleteForCategory: (collectables: GameContentItem[]) => number;
}

const useCheckContentComplete = (type: ContentSection): CheckContentCompleteReturnType => {
  const { selectedGameData } = useMainState();

  const checkContentComplete = (id: string): boolean => {
    switch (type) {
      case 'Quests':
        return !!selectedGameData?.quests.find(item => item.id === id && item.isComplete);
      case 'Collectables':
        return !!selectedGameData?.collectables.find(item => item.id === id && item.isComplete);
      case 'Locations':
        return !!selectedGameData?.locations.find(item => item.id === id && item.isComplete);
      case 'Miscellaneous':
        return !!selectedGameData?.miscellaneous.find(item => item.id === id && item.isComplete);
      default:
        return false;
    }
  };

  const checkContentCompleteForCategory = (items: GameContentItem[]): number => {
    let count = 0;

    switch (type) {
      case 'Quests':
        selectedGameData?.quests.forEach((quest) => {
          items.forEach((item) => {
            if (quest.id === item.id && quest.isComplete) {
              count += 1;
            }
          });
        });
        return count;
      case 'Collectables':
        selectedGameData?.collectables.forEach((collectable) => {
          items.forEach((item) => {
            if (collectable.id === item.id && collectable.isComplete) {
              count += 1;
            }
          });
        });
        return count;
      case 'Locations':
        selectedGameData?.locations.forEach((location) => {
          items.forEach((item) => {
            if (location.id === item.id && location.isComplete) {
              count += 1;
            }
          });
        });
        return count;
      case 'Miscellaneous':
        selectedGameData?.miscellaneous.forEach((miscItem) => {
          items.forEach((item) => {
            if (miscItem.id === item.id && miscItem.isComplete) {
              count += 1;
            }
          });
        });
        return count;
      default:
        return 0;
    }
  }

  return { checkContentComplete, checkContentCompleteForCategory }
}

export default useCheckContentComplete;