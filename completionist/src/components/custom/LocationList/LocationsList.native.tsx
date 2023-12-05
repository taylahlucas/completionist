import React from 'react';
import locations from '../../../../backend/database/skyrim_locations.json';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Location } from '@utils/CustomInterfaces';
import ListItem from '@components/general/Lists/ListItem.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

const LocationList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredLocations: Location[] = locations.filter(location => getFormattedSearchString(location.name).includes(getFormattedSearchString(searchValue)));
  const totalLocations: number = filteredLocations.length;
  const completedLocations: number = 0;
  // TODO: Add custom mapping for locations
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {filteredLocations.map((location: Location, index: number) => (
        <ListItem key={index} name={location.name} action={() => null} />
      ))}
    </ScrollableList>
  );
};

export default LocationList;