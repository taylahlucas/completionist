import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Collectables = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;