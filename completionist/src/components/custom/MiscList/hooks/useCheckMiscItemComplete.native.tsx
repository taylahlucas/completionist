import useMainState from '@redux/hooks/useMainState';
import { MiscItem } from '@utils/CustomInterfaces';

interface CheckLocationCompleteReturnType {
  checkMiscItemComplete: (id: string) => boolean;
  checkMiscItemsCompleteForCategory: (miscItems: MiscItem[]) => number;
}

const useCheckMiscItemComplete = (): CheckLocationCompleteReturnType => {
  const { user } = useMainState();

  const checkMiscItemComplete = (id: string): boolean => {
    return !!user.data.skyrim.miscellaneous.find(item => item.id === id && item.isComplete)
  };

  const checkMiscItemsCompleteForCategory = (miscItems: MiscItem[]): number => {
    let count = 0;
    user.data.skyrim.miscellaneous.forEach((miscItem) => {
      miscItems.forEach((item) => {
        if (miscItem.id === item.id && miscItem.isComplete) {
          count += 1;
        }
      });
    })
    return count;
  }

  return { checkMiscItemComplete, checkMiscItemsCompleteForCategory }
}

export default useCheckMiscItemComplete;