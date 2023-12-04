import React from 'react';
import books from '../../../../backend/database/skyrim_books.json';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Book } from '@utils/CustomTypes';
import ListItem from '@components/general/Lists/ListItem.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

const BookList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredBooks: Book[] = books.filter(book => getFormattedSearchString(book.name).includes(getFormattedSearchString(searchValue)));

  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {filteredBooks.map((book: Book, index: number) => (
        <ListItem key={index} name={book.name} />
      ))}
    </ScrollableList>
  );
};

export default BookList;