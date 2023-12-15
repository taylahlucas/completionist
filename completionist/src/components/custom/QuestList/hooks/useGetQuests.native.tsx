import { Item, Quest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

// TODO: Add return type
const useGetQuests = () => {
  const { setCompletedQuests } = useMainDispatch();
  const { searchValue, selectedGame, user } = useMainState();
  const { mapDataToQuests } = useGetGameData();
  const quests = mapDataToQuests(selectedGame);
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredQuests = quests.filter(quest => getFormattedSearchString(quest.title).includes(getFormattedSearchString(searchValue)));

  const getQuestsForSubCategory = (subCategory: string): Quest[] => {
    return filteredQuests.filter(quest => quest.subCategory === subCategory);
  }

  const getQuestsForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): Quest[] => {
    return filteredQuests.filter(quest => quest.subCategory === subCategory && quest.subCategoryType === subCategoryType);
  }
  
  const getQuestsForCategory = (mainCategory: string): Quest[] => {
    return filteredQuests.filter(quest => quest.mainCategory === mainCategory);
  }

  const getAllQuestsForCategory = (mainCategory: string): Quest[] => {
    return quests.filter(quest => quest.mainCategory === mainCategory);
  }

  const getQuestCategories = (): string[] => {
    let questCategories: string[] = [];
    quests.map(quest => {
      if (!questCategories.find(item => item === quest.mainCategory)) {
        questCategories.push(quest.mainCategory);
      }
    });
    return questCategories;
  }

  const getQuestSubCategories = (category: string): string[] => {
    const filteredQuests = quests.filter(quest => quest.mainCategory === category);
    let questSubCategories: string[] = [];
    filteredQuests.map(quest => {
      if (!questSubCategories.find(item => item === quest.subCategory)) {
        if (!!quest.subCategory) {
          questSubCategories.push(quest.subCategory);
        }
      }
    });
    return questSubCategories;
  }

  const getQuestSubCategoriesTypes = (subCategory: string): string[] => {
    const filteredQuests = quests.filter(quest => quest.subCategory === subCategory);
    let questSubCategoryTypes: string[] = [];
    filteredQuests.map(quest => {
      if (!questSubCategoryTypes.find(item => item === quest.subCategoryType)) {
        if (!!quest.subCategoryType) {
          questSubCategoryTypes.push(quest.subCategoryType);
        }
      }
    });
    return questSubCategoryTypes;
  }

  const getUserQuests = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.quests;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.quests;
      default: 
        return []
    }
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
    getQuestsForSubCategory,
    getQuestsForSubCategoryWithType,
    getQuestsForCategory,
    getAllQuestsForCategory,
    getQuestCategories,
    getQuestSubCategories,
    getQuestSubCategoriesTypes,
    updateQuestItemsComplete
  }
};
export default useGetQuests;