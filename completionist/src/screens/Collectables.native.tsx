import React from 'react';
import { mappedCollectables } from '@data/functions';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';

const Collectables = () => {
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${user.data?.skyrim.collectables.length ?? 0}/${mappedCollectables.length}`}
      </CompletedQuantityTitle>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;