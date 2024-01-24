import React, { useEffect } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import ContentList from '@components/custom/ContentList/ContentList.native';
import useContentState from '@components/custom/ContentList/hooks/useContentState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';

const Quests = () => {
  const type = 'Quests';
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue } = useContentState();
  const { getUserQuests } = useGetUserGameData();
  const { mapDataTo } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={type} />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${getUserQuests().length}/${mapDataTo(type, selectedGame, true).length}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};

export default Quests;