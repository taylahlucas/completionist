import React from 'react';
import locations from '../../../../backend/database/skyrim_locations.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { Location } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useCheckLocationComplete from './hooks/useCheckLocationComplete.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useUpdateLocationsComplete from './hooks/useUpdateLocationsComplete';

const LocationList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredLocations: Location[] = locations.filter(location => getFormattedSearchString(location.name).includes(getFormattedSearchString(searchValue)));
  const { checkLocationComplete } = useCheckLocationComplete();
  const { updateLocationsComplete } = useUpdateLocationsComplete();
  
  // TODO: Add custom map for locations
  return (
    <ScrollableList>
      {filteredLocations.map((location: Location, index: number) => (
        <ListItem 
          key={index} 
          id={location.id} 
          name={location.name}
          isComplete={checkLocationComplete({ id: location.id })}
          action={(): void => updateLocationsComplete(location.id)}
        />
      ))}
    </ScrollableList>
  );
};

export default LocationList;