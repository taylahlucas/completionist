import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface GameDataReturnType {
  getCollectableCategories: () => string[];
  getCollectableSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
  getCollectableSubCategoriesTypes: (subCategory: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetCollectableCategories = (): GameDataReturnType => {
  const { mapDataToCollectables } = useGetGameData();
  const { selectedGameData } = useMainState();
  const { shouldShowDisabledSections } = useGetSettingsConfig();

  const getCollectableCategories = (): string[] => {
    return (!!selectedGameData
      ? selectedGameData?.settingsConfig.filter(config =>
        config.section === "Collectables"
        && config.category !== ""
        && (!shouldShowDisabledSections() ? config.isActive : true)
      )
        .map(config => config.category)
      : []);
  }

  const getCollectableSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const collectables = mapDataToCollectables(selectedGame);
    const filteredCollectables = collectables.filter(collectable => collectable.mainCategory === category);
    let collectableSubCategories: string[] = [];
    filteredCollectables.map(collectable => {
      if (!collectableSubCategories.find(item => item === collectable.subCategory)) {
        if (!!collectable.subCategory) {
          collectableSubCategories.push(collectable.subCategory);
        }
      }
    });
    return collectableSubCategories;
  }

  const getCollectableSubCategoriesTypes = (subCategory: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const collectables = mapDataToCollectables(selectedGame);
    const filteredCollectables = collectables.filter(collectable => collectable.subCategory === subCategory);
    let collectableSubCategoryTypes: string[] = [];
    filteredCollectables.map(collectable => {
      if (!collectableSubCategoryTypes.find(item => item === collectable.subCategoryType)) {
        if (!!collectable.subCategoryType) {
          collectableSubCategoryTypes.push(collectable.subCategoryType);
        }
      }
    });
    return collectableSubCategoryTypes;
  }


  return {
    getCollectableCategories,
    getCollectableSubCategories,
    getCollectableSubCategoriesTypes
  }
};

export default useGetCollectableCategories;