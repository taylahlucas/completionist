import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface CheckLocationCompleteReturnType {
  getMiscItemCategories: (selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetMiscItemCategories = (): CheckLocationCompleteReturnType => {
  const { mapDataToMiscItems } = useGetGameData();

  const getMiscItemCategories = (selectedGame?: SubscriptionTypeEnum): string[] => {
    const miscItems = mapDataToMiscItems(selectedGame);
    let miscItemCategories: string[] = [];
    miscItems.map(miscItem => {
      if (!miscItemCategories.find(item => item === miscItem.mainCategory)) {
        miscItemCategories.push(miscItem.mainCategory);
      }
    });
    return miscItemCategories;
  };

  return {
    getMiscItemCategories
  }
};

export default useGetMiscItemCategories;