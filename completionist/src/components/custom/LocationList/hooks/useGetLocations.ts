import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item, Location } from '@utils/CustomInterfaces';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

interface GetLocationReturnType {
  getLocationsForCategory: (category: string) => Location[];
  getUserLocations: () => Item[];
  updateLocationsComplete: (locationId: string) => void;
}

const useGetLocations = (): GetLocationReturnType => {
  const { setCompletedLocations } = useMainDispatch();
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToLocations } = useGetGameData();
  const locations = mapDataToLocations();
  const filteredLocations = locations.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));
  const { getUserLocations } = useGetUserGameData();

  const getLocationsForCategory = (category: string): Location[] => {
    return filteredLocations.filter(item => item.hold === category);
  };

  const updateLocationsComplete = (locationId: string) => {
    const userLocations = getUserLocations();
    const itemToUpdate =userLocations.find(item => item.id === locationId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedLocations: Item[] = userLocations.map(miscItem => miscItem.id === itemToUpdate.id ? { ...miscItem, ...updatedObject } : miscItem)
      setCompletedLocations(updateCompletedLocations);
    }
    else {
      const updateCompletedLocations: Item[] = [...userLocations, { id: locationId, isComplete: true }];
      setCompletedLocations(updateCompletedLocations);
    }
  };

  return {
    getLocationsForCategory,
    getUserLocations,
    updateLocationsComplete
  }
};

export default useGetLocations;