import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { MiscItem } from '@utils/CustomInterfaces';

interface CheckLocationCompleteReturnType {
  checkMiscItemComplete: (id: string) => boolean;
  checkMiscItemsCompleteForCategory: (miscItems: MiscItem[]) => number;
}

const useCheckMiscItemComplete = (): CheckLocationCompleteReturnType => {
  const { user, selectedGame } = useMainState();

  const checkMiscItemComplete = (id: string): boolean => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return !!user.data?.skyrim.miscellaneous.find(item => item.id === id && item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return !!user.data?.fallout4.miscellaneous.find(item => item.id === id && item.isComplete)
      default:
        return false
    }
  };

  const checkMiscItemsCompleteForCategory = (miscItems: MiscItem[]): number => {
    let count = 0;
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        user.data?.skyrim.miscellaneous.forEach((miscItem) => {
          miscItems.forEach((item) => {
            if (miscItem.id === item.id && miscItem.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      case SubscriptionTypeEnum.FALLOUT_4:
        user.data?.fallout4.miscellaneous.forEach((miscItem) => {
          miscItems.forEach((item) => {
            if (miscItem.id === item.id && miscItem.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      default:
        return 0;
    }
  }

  return { checkMiscItemComplete, checkMiscItemsCompleteForCategory }
}

export default useCheckMiscItemComplete;