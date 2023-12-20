import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item, Location } from '@utils/CustomInterfaces';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

interface GetLocationReturnType {
  getLocationsForDLC: (dlc: string) => Location[];
  getLocationsForHoldInDLC: (dlc: string, hold: string) => Location[];
  getUserLocations: () => Item[];
  updateLocationsComplete: (locationId: string) => void;
}

const useGetLocations = (): GetLocationReturnType => {
  const { setCompletedLocations } = useMainDispatch();
  const { searchValue, selectedGame } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToLocations } = useGetGameData(selectedGame);
  const locations = mapDataToLocations();
  const filteredLocations = locations.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));
  const { getUserLocations } = useGetUserGameData();

  const getLocationsForDLC = (dlc: string): Location[] => {
    return filteredLocations.filter(item => dlc === item.dlc);
  };

  const getLocationsForHoldInDLC = (dlc: string, hold: string): Location[] => {
    return filteredLocations.filter(item => dlc === item.dlc && hold === item.hold);
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
    getLocationsForDLC,
    getLocationsForHoldInDLC,
    getUserLocations,
    updateLocationsComplete
  }
};

export default useGetLocations;