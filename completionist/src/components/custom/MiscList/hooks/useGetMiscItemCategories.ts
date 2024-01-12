import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface CheckLocationCompleteReturnType {
  getMiscItemCategories: (selectedGame?: SubscriptionTypeEnum) => string[];
  getMiscItemSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
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

  const getMiscItemSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const miscItems = mapDataToMiscItems(selectedGame);
    const filteredMiscItems = miscItems.filter(item => item.mainCategory === category);
    let miscItemSubCategories: string[] = [];
    filteredMiscItems.map(miscItem => {
      if (!miscItemSubCategories.find(item => item === miscItem.subCategory)) {
        if (!!miscItem.subCategory) {
          miscItemSubCategories.push(miscItem.subCategory);
        }
      }
    });
    return miscItemSubCategories;
  };

  return {
    getMiscItemCategories,
    getMiscItemSubCategories
  }
};

export default useGetMiscItemCategories;