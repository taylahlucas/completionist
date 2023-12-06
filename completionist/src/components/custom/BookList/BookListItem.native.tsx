import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import { ListItemContainer, ListItemTitle } from '@components/general/Lists/ListStyledComponents.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';

interface ListItemProps {
  id: string;
  name: string;
  isComplete?: boolean;
}

const BookListItem = ({ id, name, isComplete = false }: ListItemProps) => {
  const theme = useGetTheme();
  const { setCompletedBookIds } = useMainDispatch();
  const { completedBookIds } = useMainState();

  const addOrRemoveBook= () => {
    if (isComplete) {
      setCompletedBookIds(completedBookIds.filter(bookId => bookId !== id));
    }
    else {
      const updateCompletedLocations = [...completedBookIds, id]
      setCompletedBookIds(updateCompletedLocations);
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
      <CheckBox isToggled={isComplete} action={() => addOrRemoveBook()} />
    </ListItemContainer>
  );
}

export default BookListItem;