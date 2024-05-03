import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useContentState from './useContentState';

interface GameDataReturnType {
  getContentCategories: () => SettingsListItem[];
  getContentSubCategories: (category: string, selectedGame?: GameKeyEnum) => string[];
  getContentSubCategoriesTypes: (subCategory: string, selectedGame?: GameKeyEnum) => string[];
}

const useGetContentCategories = (): GameDataReturnType => {
  const { mapDataTo } = useGetGameData();
  const { sectionType } = useContentState();
  const { selectedGame, selectedGameData } = useMainState();
  const { shouldShowDisabledSections } = useGetSettingsConfig();
  const { translateCategoryName, translateDLCName } = useTranslateGameContent();

  const getContentCategories = (): SettingsListItem[] => {
    return (!!selectedGame && !!selectedGameData)
      ? selectedGameData?.settingsConfig.general.filter(config =>
        config.section.id === sectionType
        && (!shouldShowDisabledSections() ? config.section.isActive : true)
      )
        .map(section => {
          const categories = section.categories
            .map(category => ({
              id: category.id,
              title: translateCategoryName(
								selectedGame, 
								section.section.id, 
								category.id
							),
              isActive: category.isActive
            }))
            const dlc = section.dlc.map(category => ({
              id: category.id,
              title: translateDLCName(selectedGame, category.id),
              isActive: category.isActive
            }))
            return categories.concat(dlc);
        })[0]
      : [];
  }

  const getContentSubCategories = (category: string, selectedGame?: GameKeyEnum): string[] => {
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

  const getContentSubCategoriesTypes = (subCategory: string, selectedGame?: GameKeyEnum): string[] => {
    const items = mapDataTo(sectionType, selectedGame);
    const filteredItems = items.filter(collectable => 
			collectable.subCategory === subCategory
		);
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