import React from 'react';
import locations from '../../backend/database/skyrim_locations.json';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useMainState from '@redux/hooks/useMainState';
import LocationList from '@components/custom/LocationList/LocationList.native';

const Locations = () => {
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${user.data.skyrim.locations.length}/${locations.length}`}</CompletedQuantityTitle>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;