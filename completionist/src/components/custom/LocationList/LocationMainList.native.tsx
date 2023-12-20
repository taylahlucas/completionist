import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import useGetLocations from './hooks/useGetLocations';
import { CollectableListSubItemContainer } from '../CollectableList/CollectableListStyledComponents.native';
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
  
  // TODO: Move CollectableListSubItemContainer to different styled components
  return (
    <CollectableListSubItemContainer>
      {locations?.map((collectable, index) => (
        <ListItem 
          id={collectable.id}
          key={index}
          name={collectable.name}
          isComplete={checkLocationComplete(collectable.id)}
          action={(): void => updateLocationsComplete(collectable.id)}
        />
      ))}
    </CollectableListSubItemContainer>
  );
};

export default LocationMainList;