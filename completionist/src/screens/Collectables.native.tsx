import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';

const Collectables = () => {
  return (
    <StandardLayout>
      <StyledText>Collectables</StyledText>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;