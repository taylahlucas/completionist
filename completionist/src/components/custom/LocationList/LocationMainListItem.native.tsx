import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useMainState from '@redux/hooks/useMainState';
import useGetLocations from './hooks/useGetLocations';
import ListItem from '@components/general/Lists/ListItem.native';
import { Location } from '@utils/CustomInterfaces';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';

export interface LocationMainListItemProps {
  category: string;
  completed: string;
  total: string;
}

const LocationMainListItem = ({ category, completed, total }: LocationMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getLocationsForCategory, updateLocationsComplete } = useGetLocations()
  const { checkLocationComplete } = useCheckLocationComplete();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      {getLocationsForCategory(category).map((item: Location, index: number) => (
        <ListItem 
          key={index}
          id={item.id}
          name={item.name}
          isComplete={checkLocationComplete(item.id)}
          action={(): void => updateLocationsComplete(item.id)}
        />
      ))}
    </Dropdown>
  );
};

export default LocationMainListItem;