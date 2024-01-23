import { Item, Quest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useQuestState from './useQuestState';

interface GetQuestReturnType {
  getFilteredQuests: () => Quest[];
  getQuestsForSubCategory: (subCategory: string) => Quest[];
  getQuestsForSubCategoryWithType: (subCategory: string, subCategoryType?: string) => Quest[];
  getQuestsForCategory: (mainCategory: string) => Quest[];
  getAllQuestsForCategory: (mainCategory: string) => Quest[];
  updateQuestItemsComplete: (questId: string) => void;
}

const useGetQuests = (): GetQuestReturnType => {
  const { setCompletedQuests } = useMainDispatch();
  const { selectedGame } = useMainState();
  const { searchValue } = useQuestState();
  const { getUserQuests } = useGetUserGameData();
  const { mapDataToQuests, mapDataToFilteredQuests } = useGetGameData();
  const quests = mapDataToFilteredQuests(selectedGame);
  const getFormattedSearchString = useSearchStringFormatter();

  const getFilteredQuests = (): Quest[] => {
    return quests.filter(quest => getFormattedSearchString(quest.title).includes(getFormattedSearchString(searchValue)));
  };

  const getQuestsForSubCategory = (subCategory: string): Quest[] => {
    return quests.filter(quest => quest.subCategory === subCategory);
  }

  const getQuestsForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): Quest[] => {
    return quests.filter(quest => quest.subCategory === subCategory && quest.subCategoryType === subCategoryType);
  }
  
  const getQuestsForCategory = (mainCategory: string): Quest[] => {
    return quests.filter(quest => quest.mainCategory === mainCategory);
  }

  const getAllQuestsForCategory = (mainCategory: string): Quest[] => {
    return mapDataToQuests(selectedGame).filter(quest => quest.mainCategory === mainCategory);
  }

  const updateQuestItemsComplete = (questId: string) => {
    const userQuests = getUserQuests();
    const itemToUpdate = userQuests.find(item => item.id === questId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedQuests: Item[] = userQuests.map(quest => quest.id === itemToUpdate.id ? { ...quest, ...updatedObject } : quest)
      setCompletedQuests(updateCompletedQuests);
    }
    else {
      const updateCompletedQuests: Item[] = [...userQuests, { id: questId, isComplete: true }];
      setCompletedQuests(updateCompletedQuests);
    }
  };

  return {
    getFilteredQuests,
    getQuestsForSubCategory,
    getQuestsForSubCategoryWithType,
    getQuestsForCategory,
    getAllQuestsForCategory,
    updateQuestItemsComplete
  }
};
export default useGetQuests;