import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import React from 'react';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';

const LocationSearchResults = () => {
  const {
    getFilteredLocations,
    updateLocationsComplete
  } = useGetLocations();
  const {
    checkLocationComplete
  } = useCheckLocationComplete();
  
  return (
    <ScrollableList>
      {getFilteredLocations().map((location, index) => (
        <ListItem
          key={index}
          id={location.id}
          name={location.name}
          isComplete={checkLocationComplete(location.id)}
          action={((): void => updateLocationsComplete(location.id))}
        />
      ))}
    </ScrollableList>
  );
};

export default LocationSearchResults;