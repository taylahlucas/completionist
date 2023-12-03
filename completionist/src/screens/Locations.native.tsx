import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import LocationList from '@components/custom/LocationList/LocationsList.native';

const Locations = () => {
  return (
    <StandardLayout>
      <StyledText>Locations</StyledText>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;