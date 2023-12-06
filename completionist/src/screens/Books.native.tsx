import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import books from '../../backend/database/skyrim_books.json';
import NavigationHeader from '@navigation/NavigationHeader.native';
import BookList from '@components/custom/BookList/BookList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from '@redux/hooks/useMainState';

const Books = () => {
  const { completedBookIds } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Books'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>{`${completedBookIds.length}/${books.length}`}</StyledText>
      <BookList />
    </StandardLayout>
  );
};

export default Books;