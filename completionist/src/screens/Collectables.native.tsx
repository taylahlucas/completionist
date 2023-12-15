import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

const Collectables = () => {
  const { getUserCollectables } = useGetUserGameData();
  const { mapDataToCollectables } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${getUserCollectables().length}/${mapDataToCollectables().length}`}
      </CompletedQuantityTitle>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;