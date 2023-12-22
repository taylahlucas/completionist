import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import LocationList from '@components/custom/LocationList/LocationList.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainState from '@redux/hooks/useMainState';

const Locations = () => {
  const { selectedGame } = useMainState();
  const { getUserLocations } = useGetUserGameData();
  const { mapDataToFilteredLocations } = useGetGameData();

  // TODO: Fix amounts filtering
  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserLocations().length}/${mapDataToFilteredLocations(selectedGame).length}`}</CompletedQuantityTitle>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;