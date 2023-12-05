import React, { useEffect, useState } from 'react';
import books from '../../../../backend/database/skyrim_books.json';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { Book } from '@utils/CustomInterfaces';
import ListItem from '@components/general/Lists/ListItem.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import BookListItem from './BookListItem.native';

const BookList = () => {
  const { setCompletedBookIds } = useMainDispatch();
  const { searchValue, completedBookIds } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredBooks: Book[] = books.filter(book => getFormattedSearchString(book.name).includes(getFormattedSearchString(searchValue)));


  const totalBooks: number = filteredBooks.length;
  const numberOfCompleted: number = completedBookIds.length;

    // useEffect(() => {
  //   if (isCompleted) {
  //     setCompletedBookIds(completedBookIds.filter(bookId => bookId !== id));
  //   }
  //   else {
  //     const updatedCompletedBooks = [...completedBookIds, id]
  //     setCompletedBookIds(updatedCompletedBooks);
  //   }
  // }, [completedBookIds]);

  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {filteredBooks.map((book: Book, index: number) => (
        <BookListItem
          key={index} 
          id={book.id}
          name={book.name}
          isCompleted={!!completedBookIds.find(bookId => bookId === book.id)}
        />
      ))}
    </ScrollableList>
  );
};

export default BookList;