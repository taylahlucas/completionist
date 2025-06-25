import {
  useGetSettingsConfig,
  useTranslateGameContent,
} from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { ContentItem, GameContentItem } from '@utils/CustomInterfaces';
import { useContentState } from '../provider';

interface GameDataReturnType {
  getContentCategories: () => ContentItem[];
  getContentSubCategories: (
    category: string,
    selectedGame?: GameKeyEnum,
  ) => string[];
  getContentSubCategoriesTypes: (
    subCategory: string,
    selectedGame?: GameKeyEnum,
  ) => string[];
}

export const useGetContentCategories = (): GameDataReturnType => {
  const { sectionType } = useContentState();
  const { user, selectedGameSettings } = useMainState();
  const { gameContent } = useContentState();
  const { shouldHideDisabledSections } = useGetSettingsConfig();
  const { translateCategoryName, translateDLCName } = useTranslateGameContent();

  const getContentCategories = (): ContentItem[] => {
    const selectedGame = user.gameData?.find(
      item => item.id === selectedGameSettings,
    );

    const section = selectedGame?.settingsConfig.general.filter(
      config => config.section.id === sectionType,
    )[0] ?? {
      section: {
        id: '',
      },
      categories: [],
      dlc: [],
    };

    if (selectedGame) {
      const mainCategories: ContentItem[] = (
        !shouldHideDisabledSections()
          ? section?.categories.filter(category => category.isActive)
          : section?.categories
      ).map(category => {
        return {
          id: category.id,
          title: translateCategoryName(
            selectedGame.id,
            section.section.id,
            category.id,
          ),
          isActive: category.isActive,
        };
      });
      const dlcCategories: ContentItem[] = (
        !shouldHideDisabledSections()
          ? section?.dlc.filter(dlc => dlc.isActive)
          : section?.dlc
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

  const getContentSubCategories = (
    category: string,
    selectedGameId?: GameKeyEnum,
  ): string[] => {
    const items: GameContentItem[] = gameContent?.[sectionType] ?? [];
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
  };

  const getContentSubCategoriesTypes = (
    subCategory: string,
    selectedGameId?: GameKeyEnum,
  ): string[] => {
    const items: GameContentItem[] = gameContent?.[sectionType] ?? [];
    const filteredItems = items.filter(
      collectable => collectable.subCategory === subCategory,
    );
    let itemSubCategoriesTypes: string[] = [];

    filteredItems.map(item => {
      if (
        !itemSubCategoriesTypes.find(
          category => category === item.subCategoryType,
        )
      ) {
        if (!!item.subCategoryType) {
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
