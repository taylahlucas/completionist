import React, { useState } from 'react';
import useMainState from '@redux/hooks/useMainState';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import { CollectableListSubItemContainer } from '../CollectableList/CollectableListStyledComponents.native';

export interface LocationSubListItemProps {
  dlc: string;
  hold: string;
  completed: string;
  total: string;
}

const LocationSubListItem = ({ dlc, hold, completed, total }: LocationSubListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { checkLocationComplete } = useCheckLocationComplete();
  const { getLocationsForHoldInDLC, updateLocationsComplete } = useGetLocations()
  
  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <SubListHeader title={hold} completed={completed} total={total} />
      }
    >
      <CollectableListSubItemContainer>
        {getLocationsForHoldInDLC(dlc, hold).map((item, index) => (
          <ListItem
            key={index}
            id={item.id}
            name={item.name}
            isComplete={checkLocationComplete(item.id)}
            action={(): void => updateLocationsComplete(item.id)}
          />
        ))}
      </CollectableListSubItemContainer>
    </Dropdown>
  );
};

export default LocationSubListItem;