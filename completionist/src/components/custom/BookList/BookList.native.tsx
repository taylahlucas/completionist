import React from 'react';
import books from '../../../../backend/database/skyrim_books.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { Book } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useCheckBookComplete from './hooks/useCheckBookComplete.native';
import ListItem from '@components/general/Lists/ListItem.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const BookList = () => {
  const { setCompletedBookIds } = useMainDispatch();
  const { searchValue, completedBookIds } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredBooks: Book[] = books.filter(book => getFormattedSearchString(book.name).includes(getFormattedSearchString(searchValue)));
  const { checkBookComplete } = useCheckBookComplete();
  
  return (
    <ScrollableList>
      {filteredBooks.map((book: Book, index: number) => (
        <ListItem
          key={index} 
          id={book.id}
          name={book.name}
          isComplete={checkBookComplete({ id: book.id })}
          action={(): void => {
            if (checkBookComplete({ id: book.id })) {
              setCompletedBookIds(completedBookIds.filter(bookId => bookId !== book.id));
            }
            else {
              const updateCompletedBooks= [...completedBookIds, book.id]
              setCompletedBookIds(updateCompletedBooks);
            }
          }}
        />
      ))}
    </ScrollableList>
  );
};

export default BookList;