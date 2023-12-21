import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface GetQuestCategoriesReturnType {
  getQuestCategories: (selectedGame?: SubscriptionTypeEnum) => string[];
  getQuestSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
  getQuestSubCategoriesTypes: ( subCategory: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetQuestCategories = (): GetQuestCategoriesReturnType => {
  const { mapDataToQuests } = useGetGameData();

  const getQuestCategories = (selectedGame?: SubscriptionTypeEnum): string[] => {
    const quests = mapDataToQuests(selectedGame);
    let questCategories: string[] = [];
    quests.map(quest => {
      if (!questCategories.find(item => item === quest.mainCategory)) {
        questCategories.push(quest.mainCategory);
      }
    });
    return questCategories;
  }

  const getQuestSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const quests = mapDataToQuests(selectedGame);
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

  const getQuestSubCategoriesTypes = (subCategory: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const quests = mapDataToQuests(selectedGame);
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

  return {
    getQuestCategories,
    getQuestSubCategories,
    getQuestSubCategoriesTypes
  }
};

export default useGetQuestCategories;