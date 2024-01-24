import { Collectable } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface CheckCollectableCompleteReturnType {
  checkCollectableComplete: (id: string) => boolean;
  checkCollectablesCompleteForCategory: (collectables: Collectable[]) => number;
}

const useCheckCollectableComplete = (): CheckCollectableCompleteReturnType => {
  const { user, selectedGame } = useMainState();

  const checkCollectableComplete = (id: string): boolean => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return !!user.data?.skyrim.collectables.find(item => item.id === id && item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return !!user.data?.fallout4.collectables.find(item => item.id === id && item.isComplete)
      default:
        return false
    }
  };

  const checkCollectablesCompleteForCategory = (collectables: Collectable[]): number => {
    let count = 0;
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        user.data?.skyrim.collectables.forEach((collectable) => {
          collectables.forEach((item) => {
            if (collectable.id === item.id && collectable.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      case SubscriptionTypeEnum.FALLOUT_4:
        user.data?.fallout4.collectables.forEach((collectable) => {
          collectables.forEach((item) => {
            if (collectable.id === item.id && collectable.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      default:
        return 0;
    }
  }

  return { checkCollectableComplete, checkCollectablesCompleteForCategory }
}

export default useCheckCollectableComplete;