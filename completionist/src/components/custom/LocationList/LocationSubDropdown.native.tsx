import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';
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
  const { selectedCategory } = useLocationState();
  const { checkLocationComplete } = useCheckLocationComplete();
  const { getLocationsForHoldInDLC, updateLocationsComplete } = useGetLocations()

  return (
    <Dropdown
      isOpen={dlc === selectedCategory.category && hold === selectedCategory.subCategory}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subCategory: hold === selectedCategory.subCategory ? '' : hold
      })}
        header={
          <SubListHeader title={hold} completed={completed} total={total} />
        }
      >
      <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
        {getLocationsForHoldInDLC(dlc, hold).map((location, index) => (
          <ListItem
            key={index}
            id={location.id}
            title={location.title}
            isComplete={checkLocationComplete(location.id)}
            action={(): void => updateLocationsComplete(location.id)}
          />
        ))}
      </ListItemScrollView>
    </Dropdown>
  );
};

export default LocationSubDropdown;