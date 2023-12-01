import quests from '../../backend/database/skyrim_quests.json';
import { SkyrimQuest } from '../utils/CustomTypes.native';

export const mapDataToQuests = (): SkyrimQuest[] => {
  return quests.map(quest => {
   return quest as SkyrimQuest
  })
};

const mappedQuests: SkyrimQuest[] = mapDataToQuests();

export const getQuestCategories = (): string[] => {
  let questCategories: string[] = [];
  mappedQuests.map(quest => {
    if (!questCategories.find(item => item === quest.mainCategory)) {
      questCategories.push(quest.mainCategory);
    }
  })
  return questCategories;
}

export const getQuestSubCategories = (category: string): string[] => {
  const filteredQuests = mappedQuests.filter(quest => quest.mainCategory === category);
  let questSubCategories: string[] = [];
  filteredQuests.map(quest => {
    if (!questSubCategories.find(item => item === quest.subCategory)) {
      if (!!quest.subCategory) {
        questSubCategories.push(quest.subCategory);
      }
    }
  })
  return questSubCategories;
}

export const getQuestSubCategoriesTypes = (subCategory: string): string[] => {
  const filteredQuests = mappedQuests.filter(quest => quest.subCategory === subCategory);
  let questSubCategoryTypes: string[] = [];
  filteredQuests.map(quest => {
    if (!questSubCategoryTypes.find(item => item === quest.subCategoryType)) {
      if (!!quest.subCategoryType) {
        questSubCategoryTypes.push(quest.subCategoryType);
      }
    }
  })
  return questSubCategoryTypes;
}

export const getQuestsForSubCategory = (subCategory: string, subCategoryType: string = ''): SkyrimQuest[] => {
  return mappedQuests.filter(quest => quest.subCategory === subCategory && quest.subCategoryType === subCategoryType);
}

export const getQuestsForCategory = (mainCategory: string): SkyrimQuest[] => {
  return mappedQuests.filter(quest => quest.mainCategory === mainCategory);
}