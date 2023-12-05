import React from 'react';
import locations from '../../backend/database/skyrim_locations.json';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import LocationList from '@components/custom/LocationList/LocationList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from 'src/redux/hooks/useMainState.native';

const Locations = () => {
  const { completedLocationIds } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>{`${completedLocationIds.length}/${locations.length}`}</StyledText>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;