import React from 'react';
import locations from '../../../../backend/database/skyrim_locations.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { Location } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useCheckLocationComplete from './hooks/useCheckLocationComplete.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import ListItem from '@components/general/Lists/ListItem.native';

const LocationList = () => {
  const { setcompletedLocations } = useMainDispatch();
  const { searchValue, completedLocations } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredLocations: Location[] = locations.filter(location => getFormattedSearchString(location.name).includes(getFormattedSearchString(searchValue)));
  const { checkLocationComplete } = useCheckLocationComplete();
  
  // TODO: Add custom map for locations
  return (
    <ScrollableList>
      {filteredLocations.map((location: Location, index: number) => (
        <ListItem 
          key={index} 
          id={location.id} 
          name={location.name}
          isComplete={checkLocationComplete({ id: location.id })}
          action={(): void => {
            if (checkLocationComplete({ id: location.id })) {
              setcompletedLocations(completedLocations.filter(locationId => locationId !== location.id));
            }
            else {
              const updateCompletedLocations = [...completedLocations, location.id]
              setcompletedLocations(updateCompletedLocations);
            }
          }}
        />
      ))}
    </ScrollableList>
  );
};

export default LocationList;