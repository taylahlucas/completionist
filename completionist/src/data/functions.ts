import quests from '../../backend/database/skyrim_quests.json';
import collectables from '../../backend/database/skyrim_collectables.json';
import { SkyrimQuest, Collectable } from '../utils/CustomInterfaces';

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

export const mappedQuests: SkyrimQuest[] = mapDataToQuests();
export const mappedCollectables: Collectable[] = mapDataToCollectables();

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

// TODO: Is this used?
export const getCollectablesSubCategoriesTypes = (subType: string): string[] => {
  const filteredCollectables = mappedCollectables.filter(quest => quest.subType === subType);
  let collectableSubCategoryTypes: string[] = [];
  filteredCollectables.map(collectable => {
    if (!collectableSubCategoryTypes.find(item => item === collectable.subType)) {
      if (!!collectable.subType) {
        collectableSubCategoryTypes.push(collectable.subType);
      }
    }
  })
  return collectableSubCategoryTypes;
}