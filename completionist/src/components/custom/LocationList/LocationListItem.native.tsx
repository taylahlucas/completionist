import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import { ListItemContainer, ListItemTitle } from '@components/general/Lists/ListStyledComponents.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';

interface LocationListItemProps {
  id: string;
  name: string;
  isComplete?: boolean;
}

const LocationListItem = ({ id, name, isComplete = false }: LocationListItemProps) => {
  const theme = useGetTheme();
  const { setCompletedLocationIds } = useMainDispatch();
  const { completedLocationIds } = useMainState();

  const addOrRemoveLocation = () => {
    if (isComplete) {
      setCompletedLocationIds(completedLocationIds.filter(locationId => locationId !== id));
    }
    else {
      const updateCompletedLocations = [...completedLocationIds, id]
      setCompletedLocationIds(updateCompletedLocations);
    }
  };

  return (
    <ListItemContainer color={isComplete ? theme.darkGrey : theme.midGrey}>
      <ListItemTitle
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={isComplete ? theme.midGrey : theme.lightestGrey}
      >
        {name}
      </ListItemTitle>
      <CheckBox isToggled={isComplete} action={() => addOrRemoveLocation()} />
    </ListItemContainer>
  );
}

export default LocationListItem;