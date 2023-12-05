import React from 'react';
import locations from '../../../../backend/database/skyrim_locations.json';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Location } from '@utils/CustomInterfaces';
import useMainState from 'src/redux/hooks/useMainState.native';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import LocationListItem from './LocationListItem.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete.native';

const LocationList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredLocations: Location[] = locations.filter(location => getFormattedSearchString(location.name).includes(getFormattedSearchString(searchValue)));
  const { checkLocationComplete } = useCheckLocationComplete();
  
  // TODO: Add custom mapping for locations
  return (
    <ScrollableList>
      {filteredLocations.map((location: Location, index: number) => (
        <LocationListItem 
          key={index} 
          id={location.id} 
          name={location.name}
          isComplete={checkLocationComplete({ id: location.id })}
        />
      ))}
    </ScrollableList>
  );
};

export default LocationList;