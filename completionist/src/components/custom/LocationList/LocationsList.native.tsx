import React from 'react';
import locations from '../../../../backend/database/skyrim_locations.json';
import LocationListItem from './LocationListItem.native';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Location } from '@utils/CustomTypes';

const LocationList = () => {
  
  // TODO: Add custom mapping for locations
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {(locations as Location[]).map((location: Location, index: number) => (
        <LocationListItem key={index} name={location.name} />
      ))}
    </ScrollableList>
  );
};

export default LocationList;