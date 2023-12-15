import { Collectable, Item } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

// TODO: Add return type
const useGetCollectables = () => {
  const { setCompletedCollectables } = useMainDispatch();
  const { user, searchValue, selectedGame } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToCollectables } = useGetGameData();
  const collectables = mapDataToCollectables(selectedGame);
  const filteredCollectables = collectables.filter(collectable => getFormattedSearchString(collectable.name).includes(getFormattedSearchString(searchValue)));

  const getCollectablesForSubCategory = (type: string, subType: string = ''): Collectable[] => {
    return filteredCollectables.filter(collectable => collectable.type === type && collectable.subType === subType);
  }

  const getCollectablesForCategory = (type: string): Collectable[] => {
    return filteredCollectables.filter(collectable => collectable.type === type);
  }

  const getAllCollectablesForCategory = (type: string): Collectable[] => {
    return mapDataToCollectables(selectedGame).filter(collectable => collectable.type === type);
  }

  const getCollectableCategories = (): string[] => {
    let collectableCategories: string[] = [];
    collectables.map(collectable => {
      if (!collectableCategories.find(item => item === collectable.type)) {
        collectableCategories.push(collectable.type);
      }
    });
    return collectableCategories;
  }

  const getCollectableSubCategories = (category: string): string[] => {
    const filteredCollectables = collectables.filter(collectable => collectable.type === category);
    let collectableSubCategories: string[] = [];
    filteredCollectables.map(collectable => {
      if (!collectableSubCategories.find(item => item === collectable.subType)) {
        if (!!collectable.subType) {
          collectableSubCategories.push(collectable.subType);
        }
      }
    });
    return collectableSubCategories;
  }

  const getUserCollectables = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.quests;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.quests;
      default: 
        return []
    }
  }

  const updateCollectablesComplete = (questId: string) => {
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
    getCollectableCategories,
    getCollectableSubCategories,
    updateCollectablesComplete
  }
};

export default useGetCollectables;