import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import useGetLocations from './hooks/useGetLocations';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';

export interface LocationMainListProps {
  dlc: string;
  hold?: string;
  isSubCategory?: boolean;
}

const LocationMainList = ({ dlc, hold, isSubCategory = false }: LocationMainListProps) => {
  const { getLocationsForDLC, getLocationsForHoldInDLC, updateLocationsComplete } = useGetLocations();
  const locations = getLocationsForDLC(dlc);
  const { checkLocationComplete } = useCheckLocationComplete();
  
  return (
    <ListContainer>
      {locations?.map((collectable, index) => (
        <ListItem 
          id={collectable.id}
          key={index}
          name={collectable.name}
          isComplete={checkLocationComplete(collectable.id)}
          action={(): void => updateLocationsComplete(collectable.id)}
        />
      ))}
    </ListContainer>
  );
};

export default LocationMainList;