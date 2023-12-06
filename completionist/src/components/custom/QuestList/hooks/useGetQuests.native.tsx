import { mappedQuests } from '@data/functions';
import { SkyrimQuest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

const useGetQuests = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredQuests = mappedQuests.filter(quest => getFormattedSearchString(quest.title).includes(getFormattedSearchString(searchValue)));

  const getQuestsForSubCategory = (subCategory: string): SkyrimQuest[] => {
    return filteredQuests.filter(quest => quest.subCategory === subCategory);
  }

  const getQuestsForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): SkyrimQuest[] => {
    return filteredQuests.filter(quest => quest.subCategory === subCategory && quest.subCategoryType === subCategoryType);
  }
  
  const getQuestsForCategory = (mainCategory: string): SkyrimQuest[] => {
    return filteredQuests.filter(quest => quest.mainCategory === mainCategory);
  }

  const getAllQuestsForCategory = (mainCategory: string): SkyrimQuest[] => {
    return mappedQuests.filter(quest => quest.mainCategory === mainCategory);
  }

  return {
    getQuestsForSubCategory,
    getQuestsForSubCategoryWithType,
    getQuestsForCategory,
    getAllQuestsForCategory
  }
};
export default useGetQuests;