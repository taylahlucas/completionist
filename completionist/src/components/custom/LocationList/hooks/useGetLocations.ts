import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Item, Location } from '@utils/CustomInterfaces';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

// TODO: Add return type
const useGetLocations = () => {
  const { setCompletedLocations } = useMainDispatch();
  const { user, searchValue, selectedGame } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const { mapDataToLocations } = useGetGameData();
  const locations = mapDataToLocations(selectedGame);
  const filteredLocations = locations.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));

  const getLocationsForCategory = (category: string): Location[] => {
    return filteredLocations.filter(item => item.hold === category);
  };

  const getLocationCategories = (): string[] => {
    let locationCategories: string[] = [];
    locations.map(location => {
      if (!locationCategories.find(item => item === location.hold)) {
        locationCategories.push(location.hold);
      }
    });
    return locationCategories;
  };

  const getUserLocations = (): Item[] => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.locations;
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.locations;
      default: 
        return []
    }
  }

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
    getLocationCategories,
    updateLocationsComplete
  }
};

export default useGetLocations;