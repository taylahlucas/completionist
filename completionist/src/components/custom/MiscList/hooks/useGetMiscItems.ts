import { Item, MiscItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const useGetMiscItems = () => {
  const { setCompletedMiscItems } = useMainDispatch();
  const { user, searchValue, selectedGame } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToMiscItems } = useGetGameData();
  const miscItems = mapDataToMiscItems(selectedGame);
  const filteredMiscItems = miscItems.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));

  const getMiscItemsForCategory = (category: string): MiscItem[] => {
    return filteredMiscItems.filter(item => item.type === category);
  };

  const getUserMiscItems = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.miscellaneous;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.miscellaneous;
      default: 
        return []
    }
  }

  const updateMiscItemsComplete = (miscItemId: string) => {
    const userMiscItems = getUserMiscItems();
    const itemToUpdate =userMiscItems.find(item => item.id === miscItemId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedMiscItems: Item[] = userMiscItems.map(miscItem => miscItem.id === itemToUpdate.id ? { ...miscItem, ...updatedObject } : miscItem)
      setCompletedMiscItems(updateCompletedMiscItems);
    }
    else {
      const updateCompletedMiscItems: Item[] = [...userMiscItems, { id: miscItemId, isComplete: true }];
      setCompletedMiscItems(updateCompletedMiscItems);
    }
  };

  return {
    getMiscItemsForCategory,
    updateMiscItemsComplete
  }
};

export default useGetMiscItems;