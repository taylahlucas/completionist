import { ContentSectionEnum, GameContentItem } from '@utils/index';
import { getFormattedSearchString } from '@utils/hooks';
import { useContentState } from '@features/game-content/provider';

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

export const useGetContent = (
  section: ContentSectionEnum,
): GameDataReturnType => {
  const { searchValue, gameContent } = useContentState();
  const items = gameContent?.[section] ?? [];

  const getFilteredContent = () => {
    return items.filter(item =>
      getFormattedSearchString(item.title).includes(
        getFormattedSearchString(searchValue),
      ),
    );
  };

  const getContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => {
      // console.log(
      //   'HERE: ',
      //   JSON.stringify(
      //     {
      //       item: item.mainCategory,
      //       mainCategory,
      //     },
      //     null,
      //     2,
      //   ),
      // );
      return item.mainCategory === mainCategory;
    });
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
