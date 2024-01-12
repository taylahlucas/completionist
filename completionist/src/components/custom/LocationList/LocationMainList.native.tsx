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

const LocationMainList = ({ dlc }: LocationMainListProps) => {
  const { getLocationsForDLC, updateLocationsComplete } = useGetLocations();
  const locations = getLocationsForDLC(dlc);
  const { checkLocationComplete } = useCheckLocationComplete();
  
  return (
    <ListContainer>
      {locations?.map((location, index) => (
        <ListItem 
          id={location.id}
          key={index}
          title={location.name}
          dlc={location.dlc}
          isComplete={checkLocationComplete(location.id)}
          action={(): void => updateLocationsComplete(location.id)}
        />
      ))}
    </ListContainer>
  );
};

export default LocationMainList;