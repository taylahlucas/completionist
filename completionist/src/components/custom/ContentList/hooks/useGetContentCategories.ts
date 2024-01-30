import { useTranslation } from 'react-i18next';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { CategoryType } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useContentState from './useContentState';

interface GameDataReturnType {
  getContentCategories: () => CategoryType[];
  getContentSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
  getContentSubCategoriesTypes: (subCategory: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetContentCategories = (): GameDataReturnType => {
  const { t } = useTranslation();
  const { mapDataTo } = useGetGameData();
  const { sectionType } = useContentState();
  const { selectedGame, selectedGameData } = useMainState();
  const { shouldShowDisabledSections } = useGetSettingsConfig();
  const { translateCategoryName } = useTranslateGameContent();

  const getContentCategories = (): CategoryType[] => {
    return (!!selectedGame && !!selectedGameData
        ? selectedGameData?.settingsConfig.filter(config =>
          config.section === sectionType
          && config.category !== ""
          && (!shouldShowDisabledSections() ? config.isActive : true)
        )
          .map(config => ({
            id: config.category,
            title: translateCategoryName(selectedGame, config)
          }))
        : []);
  }

  const getContentSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const items = mapDataTo(sectionType, selectedGame);
    const filteredItems = items.filter(item => item.mainCategory === category);

    let itemSubCategories: string[] = [];
    filteredItems.map(item => {
      if (!itemSubCategories.find(category => category === item.subCategory)) {
        if (!!item.subCategory) {
          itemSubCategories.push(item.subCategory);
        }
      }
    });
    return itemSubCategories;
  }

  const getContentSubCategoriesTypes = (subCategory: string, selectedGame?: SubscriptionTypeEnum): string[] => {  
    const items = mapDataTo(sectionType, selectedGame);
    const filteredItems = items.filter(collectable => collectable.subCategory === subCategory);
    let itemSubCategoriesTypes: string[] = [];
    
    filteredItems.map(item => {
      if (!itemSubCategoriesTypes.find(category => category === item.subCategoryType)) {
        if (!!item.subCategoryType) {
          itemSubCategoriesTypes.push(item.subCategoryType);
        }
      }
    });
    return itemSubCategoriesTypes;
  }


  return {
    getContentCategories,
    getContentSubCategories,
    getContentSubCategoriesTypes
  }
};

export default useGetContentCategories;