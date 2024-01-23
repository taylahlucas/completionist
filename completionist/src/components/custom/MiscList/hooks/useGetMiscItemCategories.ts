import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface CheckLocationCompleteReturnType {
  getMiscItemCategories: () => string[];
  getMiscItemSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetMiscItemCategories = (): CheckLocationCompleteReturnType => {
  const { mapDataToMiscItems } = useGetGameData();
  const { selectedGameData } = useMainState();
  const {
    shouldShowCompletedItems,
    shouldShowDisabledSections
  } = useGetSettingsConfig();

  const getMiscItemCategories = (): string[] => {
    return (!!selectedGameData
      ? selectedGameData?.settingsConfig.filter(config =>
        config.section === "Miscellaneous"
        && config.category !== ""
        && (!shouldShowDisabledSections() ? config.isActive : true)
      )
        .map(config => config.category)
      : []);
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