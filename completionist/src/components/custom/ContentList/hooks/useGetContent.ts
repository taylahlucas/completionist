import {GameContentItem} from '@utils/index';
import useMainState from '@redux/hooks/useMainState';
import {useGetGameData} from '@data/hooks/index';
import useContentState from '../provider/useContentState';
import {useFormatter} from '@utils/hooks/index';

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

const useGetContent = (): GameDataReturnType => {
  const {sectionType} = useContentState();
  const {selectedGame} = useMainState();
  const {searchValue} = useContentState();
  const {getFormattedSearchString} = useFormatter();
  const {mapDataTo} = useGetGameData();
  const items = mapDataTo(sectionType, selectedGame?.id);

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

export default useGetContent;
