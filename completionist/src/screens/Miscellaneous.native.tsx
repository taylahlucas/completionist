import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

const Miscellaneous = () => {
  const { getUserMiscItems } = useGetUserGameData();
  const { mapDataToMiscItems } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserMiscItems().length}/${mapDataToMiscItems().length}`}</CompletedQuantityTitle>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;