import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';
import useLocationDispatch from './hooks/useLocationDispatch';
import useLocationState from './hooks/useLocationState';

export interface LocationSubDropdownProps {
  dlc: string;
  hold: string;
  completed: string;
  total: string;
}

const LocationSubDropdown = ({ dlc, hold, completed, total }: LocationSubDropdownProps) => {
  const { setSelectedCategory } = useLocationDispatch();
  const { selectedCategory, showSearchResults } = useLocationState();
  const { checkLocationComplete } = useCheckLocationComplete();
  const { getLocationsForHoldInDLC, updateLocationsComplete } = useGetLocations()

  return (
    <Dropdown
      isOpen={dlc === selectedCategory.category && hold === selectedCategory.subType || showSearchResults}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subType: hold === selectedCategory.subType ? '' : hold
      })}
        header={
          <SubListHeader title={hold} completed={completed} total={total} />
        }
      >
      <ListContainer>
        {getLocationsForHoldInDLC(dlc, hold).map((item, index) => (
          <ListItem
            key={index}
            id={item.id}
            name={item.name}
            isComplete={checkLocationComplete(item.id)}
            action={(): void => updateLocationsComplete(item.id)}
          />
        ))}
      </ListContainer>
    </Dropdown>
  );
};

export default LocationSubDropdown;