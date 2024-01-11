import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainState from '@redux/hooks/useMainState';
import useMiscState from '@components/custom/MiscList/hooks/useMiscState';
import useMiscDispatch from '@components/custom/MiscList/hooks/useMiscDispatch';

const Miscellaneous = () => {
  const { selectedGame } = useMainState();
  const { setSearchValue } = useMiscDispatch();
  const { searchValue } = useMiscState();
  const { getUserMiscItems } = useGetUserGameData();
  const { mapDataToFilteredMiscItems } = useGetGameData();
  //  TODO: Add subtitles for DLC
  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserMiscItems().length}/${mapDataToFilteredMiscItems(selectedGame).length}`}</CompletedQuantityTitle>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;