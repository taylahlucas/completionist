import React, { useEffect, useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import TestCheckBox from '@components/general/Checkbox/CheckBox.native';
import { ListItemContainer, ListItemTitle } from '@components/general/Lists/ListStyledComponents.native';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import CheckBox from '@components/general/Checkbox/CheckBox.native';

interface ListItemProps {
  id: string;
  name: string;
  isCompleted?: boolean;
}

const BookListItem = ({ id, name }: ListItemProps) => {
  const theme = useGetTheme();
  const { setCompletedBookIds } = useMainDispatch();
  const { completedBookIds } = useMainState();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(!!completedBookIds.find(bookId => bookId === id));
  }, [completedBookIds]);

  const addOrRemoveBook = () => {
    if (isCompleted) {
      setCompletedBookIds(completedBookIds.filter(bookId => bookId !== id));
    }
    else {
      const updatedCompletedBooks = [...completedBookIds, id]
      setCompletedBookIds(updatedCompletedBooks);
    }
  };

  return (
    <ListItemContainer color={isCompleted ? theme.darkGrey : theme.midGrey}>
      <ListItemTitle
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={isCompleted ? theme.midGrey : theme.lightestGrey}
      >
        {name}
      </ListItemTitle>
      <TestCheckBox id={id} />
      {/* <CheckBox isToggled={isCompleted} action={() => addOrRemoveBook()} /> */}
    </ListItemContainer>
  );
}

export default BookListItem;