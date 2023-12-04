import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import LocationList from '@components/custom/LocationList/LocationsList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';

const Locations = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;