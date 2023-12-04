import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';

const Collectables = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar />
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;