import React from 'react';
import misc from '../../../../backend/database/skyrim_misc.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { MiscItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useCheckBookComplete from './hooks/useCheckBookComplete.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const BookList = () => {
  const { setcompletedMiscItems } = useMainDispatch();
  const { searchValue, completedMiscItems } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredBooks: MiscItem[] = misc.filter(misc => getFormattedSearchString(misc.name).includes(getFormattedSearchString(searchValue)));
  const { checkBookComplete } = useCheckBookComplete();
  
  return (
    <ScrollableList>
      {filteredBooks.map((book: MiscItem, index: number) => (
        <ListItem
          key={index} 
          id={book.id}
          name={book.name}
          isComplete={checkBookComplete({ id: book.id })}
          action={(): void => {
            if (checkBookComplete({ id: book.id })) {
              setcompletedMiscItems(completedMiscItems.filter(bookId => bookId !== book.id));
            }
            else {
              const updateCompletedBooks= [...completedMiscItems, book.id]
              setcompletedMiscItems(updateCompletedBooks);
            }
          }}
        />
      ))}
    </ScrollableList>
  );
};

export default BookList;