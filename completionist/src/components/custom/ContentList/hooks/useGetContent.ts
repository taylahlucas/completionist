import { Collectable, Item } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useCollectableState from './useCollectableState';
import { ContentSection } from '@utils/CustomTypes';

import useGetQuests from '@components/custom/QuestList/hooks/useGetQuests';
import useContentState from './useContentState';

interface GameDataReturnType {
  getFilteredCollectables: () => Collectable[];
  getCollectablesForSubCategory: (mainCategory?: string, subCategory?: string) => Collectable[];
  getCollectablesForSubCategoryWithType: (subCategory: string, subCategoryType?: string) => Collectable[];
  getCollectablesForCategory: (mainCategory: string) => Collectable[];
  getAllCollectablesForCategory:(mainCategory: string) => Collectable[];
  updateCollectablesComplete: (collectableId: string) => void;
}

const useGetContent = (type: ContentSection): GameDataReturnType => {
  const { setCompletedCollectables } = useMainDispatch();
  const { selectedGame } = useMainState();
  const { searchValue } = useContentState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataTo } = useGetGameData();
  const items = mapDataTo(type, selectedGame);
  const { getUserCollectables } = useGetUserGameData();

  const getFilteredContent = () => {
    return items.filter(item => getFormattedSearchString(item.title).includes(getFormattedSearchString(searchValue)));
  }

  const getCollectablesForSubCategory = (mainCategory: string, subCategory: string = ''): Collectable[] => {
    return collectables.filter(collectable => collectable.mainCategory === mainCategory && collectable.subCategory === subCategory);
  }

  const getCollectablesForSubCategoryWithType = (subCategory: string, subCategoryType: string = ''): Collectable[] => {
    return collectables.filter(collectable => collectable.subCategory === subCategory && collectable.subCategoryType === subCategoryType);
  }

  const getCollectablesForCategory = (mainCategory: string): Collectable[] => {
    return collectables.filter(collectable => collectable.mainCategory === mainCategory);
  }

  const getAllCollectablesForCategory = (mainCategory: string): Collectable[] => {
    return collectables.filter(collectable => collectable.mainCategory === mainCategory);
  }

  const updateCollectablesComplete = (collectableId: string): void => {
    const userCollectables = getUserCollectables();
    const itemToUpdate = userCollectables.find(item => item.id === collectableId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedCollectables: Item[] = userCollectables.map(collectable => collectable.id === itemToUpdate.id ? { ...collectable, ...updatedObject } : collectable)
      setCompletedCollectables(updateCompletedCollectables);
    }
    else {
      const updateCompletedCollectables: Item[] = [...userCollectables, { id: collectableId, isComplete: true }];
      setCompletedCollectables(updateCompletedCollectables);
    }
  };

  return {
    getFilteredCollectables,
    getCollectablesForSubCategory,
    getCollectablesForSubCategoryWithType,
    getCollectablesForCategory,
    getAllCollectablesForCategory,
    updateCollectablesComplete
  }
};

export default useGetContent;