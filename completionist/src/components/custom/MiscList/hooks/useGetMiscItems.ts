import { Item, MiscItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useGetGameData from '@data/hooks/useGetGameData';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMiscState from './useMiscState';

interface GetMiscItemsReturnType {
  getFilteredMiscItems: () => MiscItem[];
  getMiscItemsForCategory: (category: string) => MiscItem[];
  getMiscItemsForSubCategory: (mainCategory: string, subCategory?: string) => MiscItem[];
  updateMiscItemsComplete: (miscItemId: string) => void;
}

const useGetMiscItems = (): GetMiscItemsReturnType => {
  const { setCompletedMiscItems } = useMainDispatch();
  const { selectedGame } = useMainState();
  const { searchValue } = useMiscState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToMiscItems } = useGetGameData();
  const miscItems = mapDataToMiscItems(selectedGame);
  const { getUserMiscItems } = useGetUserGameData();

  const getFilteredMiscItems = (): MiscItem[] => {
    return miscItems.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));;
  };

  const getMiscItemsForCategory = (category: string): MiscItem[] => {
    return miscItems.filter(item => item.mainCategory === category);
  };

  const getMiscItemsForSubCategory = (mainCategory: string, subCategory: string = ''): MiscItem[] => {
    return miscItems.filter(item => item.mainCategory === mainCategory && item.subCategory === subCategory);
  };

  const updateMiscItemsComplete = (miscItemId: string): void => {
    const userMiscItems = getUserMiscItems();
    const itemToUpdate = userMiscItems.find(item => item.id === miscItemId);
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
    getFilteredMiscItems,
    getMiscItemsForCategory,
    getMiscItemsForSubCategory,
    updateMiscItemsComplete
  }
};

export default useGetMiscItems;