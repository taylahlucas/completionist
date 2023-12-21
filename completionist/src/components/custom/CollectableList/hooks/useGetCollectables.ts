import { Collectable, Item } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

interface GameDataReturnType {
  getCollectablesForSubCategory: (type: string, subType?: string) => Collectable[];
  getCollectablesForCategory: (type: string) => Collectable[];
  getAllCollectablesForCategory: (type: string) => Collectable[];
  updateCollectablesComplete: (questId: string) => void;
}

const useGetCollectables = (): GameDataReturnType => {
  const { setCompletedCollectables } = useMainDispatch();
  const { searchValue, selectedGame } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToCollectables } = useGetGameData();
  const collectables = mapDataToCollectables(selectedGame);
  const filteredCollectables = collectables.filter(collectable => getFormattedSearchString(collectable.name).includes(getFormattedSearchString(searchValue)));
  const { getUserCollectables } = useGetUserGameData();

  const getCollectablesForSubCategory = (type: string, subType: string = ''): Collectable[] => {
    return filteredCollectables.filter(collectable => collectable.type === type && collectable.subType === subType);
  }

  const getCollectablesForCategory = (type: string): Collectable[] => {
    return filteredCollectables.filter(collectable => collectable.type === type);
  }

  const getAllCollectablesForCategory = (type: string): Collectable[] => {
    return collectables.filter(collectable => collectable.type === type);
  }

  const updateCollectablesComplete = (questId: string): void => {
    const userCollectables = getUserCollectables();
    const itemToUpdate = userCollectables.find(item => item.id === questId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedCollectables: Item[] = userCollectables.map(quest => quest.id === itemToUpdate.id ? { ...quest, ...updatedObject } : quest)
      setCompletedCollectables(updateCompletedCollectables);
    }
    else {
      const updateCompletedCollectables: Item[] = [...userCollectables, { id: questId, isComplete: true }];
      setCompletedCollectables(updateCompletedCollectables);
    }
  };

  return {
    getCollectablesForSubCategory,
    getCollectablesForCategory,
    getAllCollectablesForCategory,
    updateCollectablesComplete
  }
};

export default useGetCollectables;