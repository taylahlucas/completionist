import React from 'react';
import { mappedCollectables } from '@data/functions';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from 'src/redux/hooks/useMainState.native';

const Collectables = () => {
  const { completedCollectableIds } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>
        {`${completedCollectableIds.length}/${mappedCollectables.length}`}
      </StyledText>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;