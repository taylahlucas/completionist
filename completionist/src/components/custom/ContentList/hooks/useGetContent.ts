import { useTranslation } from 'react-i18next';
import { GameContentItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useGetGameData from '@data/hooks/useGetGameData';
import useContentState from './useContentState';
import useFormatter from '@utils/hooks/useFormatter';

interface GameDataReturnType {
  getMainTitle: (category: string) => string;
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

  const getMainTitle = (category: string): string => {
    return (category === t('common:none') ? t('common:main') : category);
  };

  const getFilteredContent = () => {
    return items.filter(item => getFormattedSearchString(item.title).includes(getFormattedSearchString(searchValue)));
  }

  const getContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === getMainTitle(mainCategory));
  }

  const getContentForSubCategory = (mainCategory: string = '', subCategory: string = ''): GameContentItem[] => {
    return items.filter(item => item.mainCategory === getMainTitle(mainCategory) && item.subCategory === subCategory);
  }

  const getContentForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): GameContentItem[] => {
    return items.filter(item => item.subCategory === subCategory && item.subCategoryType === subCategoryType);
  }

  const getAllContentForCategory = (mainCategory: string): GameContentItem[] => {
    return items.filter(item => item.mainCategory === getMainTitle(mainCategory));
  }

  return {
    getMainTitle,
    getFilteredContent,
    getContentForCategory,
    getContentForSubCategory,
    getContentForSubCategoryWithType,
    getAllContentForCategory
  }
};

export default useGetContent;