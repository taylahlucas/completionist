import { ContentSectionEnum, GameContentItem } from '@utils/index';
import { getFormattedSearchString } from '@utils/hooks';
import { useContentState } from '@features/game-content/provider';

interface GameDataReturnType {
  getFilteredContentForSection: (
    forSection: ContentSectionEnum,
  ) => GameContentItem[] | undefined;
  getContentForCategory: (mainCategory: string) => GameContentItem[];
  getContentForSubCategory: (
    mainCategory?: string,
    subCategory?: string,
  ) => GameContentItem[];
  getContentForSubCategoryType: (
    subCategory: string,
    subCategoryType?: string,
  ) => GameContentItem[];
}

export const useGetContent = (
  section: ContentSectionEnum,
): GameDataReturnType => {
  const { searchValue, gameContent } = useContentState();
  const items = gameContent?.[section] ?? [];

  const getFilteredContentForSection = (forSection: ContentSectionEnum) => {
    return gameContent?.[forSection].filter(item =>
      getFormattedSearchString(item.title).includes(
        getFormattedSearchString(searchValue),
      ),
    );
  };

  const getContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory);
  };

  const getContentForSubCategory = (
    mainCategory: string = '',
    subCategory: string = '',
  ): GameContentItem[] => {
    return items.filter(
      item =>
        item.mainCategory === mainCategory && item.subCategory === subCategory,
    );
  };

  const getContentForSubCategoryType = (
    subCategory: string,
    subCategoryType: string = '',
  ): GameContentItem[] => {
    return items.filter(
      item =>
        item.subCategory === subCategory &&
        item.subCategoryType === subCategoryType,
    );
  };

  return {
    getFilteredContentForSection,
    getContentForCategory,
    getContentForSubCategory,
    getContentForSubCategoryType,
  };
};
