import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import LocationList from '@components/custom/LocationList/LocationsList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Locations = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;