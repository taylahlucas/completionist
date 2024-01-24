import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item, Location } from '@utils/CustomInterfaces';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useLocationState from './useLocationState';

interface GetLocationReturnType {
  getFilteredLocations: () => Location[];
  getLocationsForDLC: (dlc: string) => Location[];
  getLocationsForHoldInDLC: (dlc: string, hold: string) => Location[];
  getUserLocations: () => Item[];
  updateLocationsComplete: (locationId: string) => void;
}

const useGetLocations = (): GetLocationReturnType => {
  const { setCompletedLocations } = useMainDispatch();
  const { selectedGame } = useMainState();
  const { searchValue } = useLocationState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToLocations } = useGetGameData();
  const locations = mapDataToLocations(selectedGame);
  const { getUserLocations } = useGetUserGameData();

  const getFilteredLocations = (): Location[] => {
    return locations.filter(item => getFormattedSearchString(item.title).includes(getFormattedSearchString(searchValue)));;
  };

  const getLocationsForDLC = (dlc: string): Location[] => {
    return locations.filter(item => dlc === item.dlc);
  };

  const getLocationsForHoldInDLC = (dlc: string, hold: string): Location[] => {
    return locations.filter(item => dlc === item.dlc && hold === item.hold);
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
    getFilteredLocations,
    getLocationsForDLC,
    getLocationsForHoldInDLC,
    getUserLocations,
    updateLocationsComplete
  }
};

export default useGetLocations;