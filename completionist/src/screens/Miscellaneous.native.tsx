import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import books from '../../backend/database/skyrim_misc.json';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from '@redux/hooks/useMainState';

const Miscellaneous = () => {
  const { completedMiscItems } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>{`${completedMiscItems.length}/${books.length}`}</StyledText>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;