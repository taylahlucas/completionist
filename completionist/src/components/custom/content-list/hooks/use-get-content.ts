import { GameContentItem } from '@utils/index';
import { useContentState } from '../provider';
import { getFormattedSearchString } from '@utils/hooks/index';

interface GameDataReturnType {
  getFilteredContent: () => GameContentItem[];
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

export const useGetContent = (): GameDataReturnType => {
  const { sectionType } = useContentState();
  const { searchValue, gameContent } = useContentState();
  const items = gameContent?.[sectionType] ?? [];

  const getFilteredContent = () => {
    return items.filter(item =>
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
    getFilteredContent,
    getContentForCategory,
    getContentForSubCategory,
    getContentForSubCategoryType,
  };
};
