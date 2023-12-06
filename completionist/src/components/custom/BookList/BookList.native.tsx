import React from 'react';
import books from '../../../../backend/database/skyrim_books.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { Book } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import BookListItem from './BookListItem.native';
import useCheckBookComplete from './hooks/useCheckBookComplete.native';

const BookList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredBooks: Book[] = books.filter(book => getFormattedSearchString(book.name).includes(getFormattedSearchString(searchValue)));
  const { checkBookComplete } = useCheckBookComplete();
  
  return (
    <ScrollableList>
      {filteredBooks.map((book: Book, index: number) => (
        <BookListItem
          key={index} 
          id={book.id}
          name={book.name}
          isComplete={checkBookComplete({ id: book.id })}
        />
      ))}
    </ScrollableList>
  );
};

export default BookList;