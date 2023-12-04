import React from 'react';
import books from '../../../../backend/database/skyrim_books.json';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Book } from '@utils/CustomTypes';
import ListItem from '@components/general/Lists/ListItem.native';

const BookList = () => {
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {(books as Book[]).map((book: Book, index: number) => (
        <ListItem key={index} name={book.name} />
      ))}
    </ScrollableList>
  );
};

export default BookList;