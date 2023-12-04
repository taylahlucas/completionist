import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import BookList from '@components/custom/BookList/BookList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';

const Books = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Books'} />
      <CustomSearchBar />
      <BookList />
    </StandardLayout>
  );
};

export default Books;