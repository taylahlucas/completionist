import { useGetSettingsConfig, useTranslateGameContent } from '@data/hooks';
import { useContentState } from '@features/game-content/provider';
import { useAuthUser } from '@redux/auth';
import { useMainState } from '@redux/hooks';
import { ContentItem, GameContentItem, ContentSectionEnum } from '@utils/index';

interface GameDataReturnType {
  getContentCategories: () => ContentItem[];
  getContentSubCategories: (category: string) => string[];
  getContentSubCategoriesTypes: (subCategory: string) => string[];
}

export const useGetContentCategories = (
  section: ContentSectionEnum,
): GameDataReturnType => {
  const { gameContent } = useContentState();
  const { selectedGameSettings } = useMainState();
  const user = useAuthUser();
  const { shouldHideDisabledSections } = useGetSettingsConfig();
  const { translateCategoryName, translateDLCName } = useTranslateGameContent();

  const getContentCategories = (): ContentItem[] => {
    const selectedGame = user?.gameData?.find(
      item => item.id === selectedGameSettings,
    );

    const sectionData = selectedGame?.settingsConfig.general.filter(
      config => config.section.id === section,
    )[0] ?? {
      section: {
        id: '',
      },
      categories: [],
      dlc: [],
    };

    if (selectedGame && sectionData) {
      const mainCategories: ContentItem[] = (
        !shouldHideDisabledSections()
          ? sectionData.categories.filter(category => category.isActive)
          : sectionData.categories
      ).map(category => {
        return {
          id: category.id,
          title: translateCategoryName(
            selectedGame.id,
            sectionData.section.id,
            category.id,
          ),
          isActive: category.isActive,
        };
      });
      const dlcCategories: ContentItem[] = (
        !shouldHideDisabledSections()
          ? sectionData.dlc.filter(dlc => dlc.isActive)
          : sectionData.dlc
      ).map(dlc => {
        return {
          id: dlc.id,
          title: translateDLCName(selectedGame.id, dlc.id),
          isActive: dlc.isActive,
        };
      });
      return mainCategories.concat(dlcCategories);
    }
    return [];
  };

  const getContentSubCategories = (category: string): string[] => {
    const items: GameContentItem[] = gameContent?.[section] ?? [];
    const filteredItems = items.filter(item => item.mainCategory === category);

    const itemSubCategories: string[] = [];
    filteredItems.map(item => {
      if (!itemSubCategories.find(category => category === item.subCategory)) {
        if (item.subCategory) {
          itemSubCategories.push(item.subCategory);
        }
      }
    });
    return itemSubCategories;
  };

  const getContentSubCategoriesTypes = (subCategory: string): string[] => {
    const items: GameContentItem[] = gameContent?.[section] ?? [];
    const filteredItems = items.filter(
      collectable => collectable.subCategory === subCategory,
    );
    const itemSubCategoriesTypes: string[] = [];

    filteredItems.map(item => {
      if (
        !itemSubCategoriesTypes.find(
          category => category === item.subCategoryType,
        )
      ) {
        if (item.subCategoryType) {
          itemSubCategoriesTypes.push(item.subCategoryType);
        }
      }
    });
    return itemSubCategoriesTypes;
  };

  return {
    getContentCategories,
    getContentSubCategories,
    getContentSubCategoriesTypes,
  };
};
