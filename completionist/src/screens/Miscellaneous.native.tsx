import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import books from '../../backend/database/skyrim_misc.json';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';

const Miscellaneous = () => {
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${user.data?.skyrim.miscellaneous.length}/${books.length}`}</CompletedQuantityTitle>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;