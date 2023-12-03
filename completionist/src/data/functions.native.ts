import quests from '../../backend/database/skyrim_quests.json';
import collectables from '../../backend/database/skyrim_collectables.json';
import { SkyrimQuest, Collectable } from '../utils/CustomTypes';

export const mapDataToQuests = (): SkyrimQuest[] => {
  return quests.map(quest => {
   return quest as SkyrimQuest
  })
};

export const mapDataToCollectables = (): Collectable[] => {
  return collectables.map(collectable => {
   return collectable as Collectable
  })
};

const mappedQuests: SkyrimQuest[] = mapDataToQuests();
const mappedCollectables: Collectable[] = mapDataToCollectables();

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

export const getCollectableCategories = (): string[] => {
  let collectableCategories: string[] = [];
  mappedCollectables.map(collectable => {
    if (!collectableCategories.find(item => item === collectable.type)) {
      collectableCategories.push(collectable.type);
    }
  })
  return collectableCategories;
}
export const getCollectableSubCategories = (category: string): string[] => {
  const filteredCollectables = mappedCollectables.filter(collectable => collectable.type === category);
  let collectableSubCategories: string[] = [];
  filteredCollectables.map(collectable => {
    if (!collectableSubCategories.find(item => item === collectable.subType)) {
      if (!!collectable.subType) {
        collectableSubCategories.push(collectable.subType);
      }
    }
  })
  return collectableSubCategories;
}

export const getCollectablesForCategory = (type: string): Collectable[] => {
  return mappedCollectables.filter(collectable => collectable.type === type);
}

export const getCollectablesForSubCategory = (type: string, subType: string = ''): Collectable[] => {
  return mappedCollectables.filter(collectable => collectable.type === type && collectable.subType === subType);
}