import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainState from '@redux/hooks/useMainState';

const Miscellaneous = () => {
  const { selectedGame } = useMainState();
  const { getUserMiscItems } = useGetUserGameData();
  const { mapDataToMiscItems } = useGetGameData();
  //  TODO: Add subtitles for DLC
  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserMiscItems().length}/${mapDataToMiscItems(selectedGame).length}`}</CompletedQuantityTitle>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;