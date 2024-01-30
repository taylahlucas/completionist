import { useTranslation } from 'react-i18next';
import { GameContentItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useGetGameData from '@data/hooks/useGetGameData';
import useContentState from './useContentState';
import useFormatter from '@utils/hooks/useFormatter';

interface GameDataReturnType {
  getFilteredContent: () => GameContentItem[];
  getContentForCategory: (mainCategory: string) => GameContentItem[];
  getContentForSubCategory: (mainCategory?: string, subCategory?: string) => GameContentItem[];
  getContentForSubCategoryWithType: (subCategory: string, subCategoryType?: string) => GameContentItem[];
  getAllContentForCategory:(mainCategory: string) => GameContentItem[];
}

const useGetContent = (): GameDataReturnType => {
  const { t } = useTranslation();
  const { sectionType } = useContentState();
  const { selectedGame } = useMainState();
  const { searchValue } = useContentState();
  const { getFormattedSearchString } = useFormatter();
  const { mapDataTo } = useGetGameData();
  const items = mapDataTo(sectionType, selectedGame);

  const getFilteredContent = () => {
    return items.filter(item => getFormattedSearchString(item.title).includes(getFormattedSearchString(searchValue)));
  }

  const getContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory);
  }

  const getContentForSubCategory = (mainCategory: string = '', subCategory: string = ''): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory && item.subCategory === subCategory);
  }

  const getContentForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): GameContentItem[] => {
    return items.filter(item => item.subCategory === subCategory && item.subCategoryType === subCategoryType);
  }

  const getAllContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === mainCategory);
  }

  return {
    getFilteredContent,
    getContentForCategory,
    getContentForSubCategory,
    getContentForSubCategoryWithType,
    getAllContentForCategory
  }
};

export default useGetContent;