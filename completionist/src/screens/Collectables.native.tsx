import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useCollectableState from '@components/custom/CollectableList/hooks/useCollectableState';
import useCollectableDispatch from '@components/custom/CollectableList/hooks/useCollectableDispatch';

const Collectables = () => {
  const { selectedGame } = useMainState();
  const { setSearchValue } = useCollectableDispatch();
  const { searchValue } = useCollectableState();
  const { getUserCollectables } = useGetUserGameData();
  const { mapDataToFilteredCollectables } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${getUserCollectables().length}/${mapDataToFilteredCollectables(selectedGame).length}`}
      </CompletedQuantityTitle>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;