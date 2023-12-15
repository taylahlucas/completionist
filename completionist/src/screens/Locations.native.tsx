import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import LocationList from '@components/custom/LocationList/LocationList.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

const Locations = () => {
  const { getUserLocations } = useGetUserGameData();
  const { mapDataToLocations} = useGetGameData();
  
  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserLocations().length}/${mapDataToLocations().length}`}</CompletedQuantityTitle>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;