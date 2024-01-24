import { GameContentItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { ContentSection } from '@utils/CustomTypes';
import useContentState from './useContentState';

interface GameDataReturnType {
  getFilteredContent: () => GameContentItem[];
  getContentForSubCategory: (mainCategory: string, subCategory?: string) => GameContentItem[];
  getContentForSubCategoryWithType: (subCategory: string, subCategoryType?: string) => GameContentItem[];
  getContentForCategory: (mainCategory: string) => GameContentItem[];
  getAllContentForCategory:(mainCategory: string) => GameContentItem[];
}

const useGetContent = (type: ContentSection): GameDataReturnType => {
  const { setCompletedCollectables } = useMainDispatch();
  const { selectedGame, selectedGameData } = useMainState();
  const { searchValue } = useContentState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataTo } = useGetGameData();
  const items = mapDataTo(type, selectedGame);

  const getFilteredContent = () => {
    return items.filter(item => getFormattedSearchString(item.title).includes(getFormattedSearchString(searchValue)));
  }

  const getContentForSubCategory = (mainCategory: string, subCategory: string = ''): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory && item.subCategory === subCategory);
  }

  const getContentForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): GameContentItem[] => {
    return items.filter(item => item.subCategory === subCategory && item.subCategoryType === subCategoryType);
  }

  const getContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory);
  }

  const getAllContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory);
  }

  return {
    getFilteredContent,
    getContentForSubCategory,
    getContentForSubCategoryWithType,
    getContentForCategory,
    getAllContentForCategory
  }
};

export default useGetContent;