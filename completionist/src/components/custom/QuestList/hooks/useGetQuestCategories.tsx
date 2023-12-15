import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface GetQuestCategoriesReturnType {
  getQuestCategories: () => string[];
  getQuestSubCategories: (category: string) => string[];
  getQuestSubCategoriesTypes: (subCategory: string) => string[];
}

const useGetQuestCategories = (): GetQuestCategoriesReturnType => {
  const { selectedGame } = useMainState();
  const { mapDataToQuests } = useGetGameData(selectedGame);
  const quests = mapDataToQuests();

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

  return {
    getQuestCategories,
    getQuestSubCategories,
    getQuestSubCategoriesTypes
  }
};

export default useGetQuestCategories;