import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import useGetLocations from './hooks/useGetLocations';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';

export interface LocationMainListProps {
  dlc: string;
  hold?: string;
  isSubCategory?: boolean;
}

const LocationMainList = ({ dlc }: LocationMainListProps) => {
  const { getLocationsForDLC, updateLocationsComplete } = useGetLocations();
  const locations = getLocationsForDLC(dlc);
  const { checkLocationComplete } = useCheckLocationComplete();
  
  return (
    <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
      {locations?.map((location, index) => (
        <ListItem 
          id={location.id}
          key={index}
          title={location.name}
          isComplete={checkLocationComplete(location.id)}
          action={(): void => updateLocationsComplete(location.id)}
        />
      ))}
    </ListItemScrollView>
  );
};

export default LocationMainList;