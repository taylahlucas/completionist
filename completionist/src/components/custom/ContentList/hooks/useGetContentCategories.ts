import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { ContentSection } from '@utils/CustomTypes';

interface GameDataReturnType {
  getContentCategories: () => string[];
  getContentSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
  getContentSubCategoriesTypes: (subCategory: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetContentCategories = (type: ContentSection): GameDataReturnType => {
  const { mapDataTo } = useGetGameData();
  const { selectedGameData } = useMainState();
  const { shouldShowDisabledSections } = useGetSettingsConfig();

  const getContentCategories = (): string[] => {
    return (!!selectedGameData
      ? selectedGameData?.settingsConfig.filter(config =>
        config.section === type
        && config.category !== ""
        && (!shouldShowDisabledSections() ? config.isActive : true)
      )
        .map(config => config.category)
      : []);
  }

  const getContentSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    // TODO: 

    // const collectables = mapDataToCollectables(selectedGame);
    // const filteredCollectables = collectables.filter(collectable => collectable.mainCategory === category);
    // let collectableSubCategories: string[] = [];
    // filteredCollectables.map(collectable => {
    //   if (!collectableSubCategories.find(item => item === collectable.subCategory)) {
    //     if (!!collectable.subCategory) {
    //       collectableSubCategories.push(collectable.subCategory);
    //     }
    //   }
    // });
    // return collectableSubCategories;
    return []
  }

  const getContentSubCategoriesTypes = (subCategory: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    // TODO:
    return []
    // const collectables = mapDataToCollectables(selectedGame);
    // const filteredCollectables = collectables.filter(collectable => collectable.subCategory === subCategory);
    // let collectableSubCategoryTypes: string[] = [];
    // filteredCollectables.map(collectable => {
    //   if (!collectableSubCategoryTypes.find(item => item === collectable.subCategoryType)) {
    //     if (!!collectable.subCategoryType) {
    //       collectableSubCategoryTypes.push(collectable.subCategoryType);
    //     }
    //   }
    // });
    // return collectableSubCategoryTypes;
  }


  return {
    getContentCategories,
    getContentSubCategories,
    getContentSubCategoriesTypes
  }
};

export default useGetContentCategories;