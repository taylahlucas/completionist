import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import QuestList from '@components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainState from '@redux/hooks/useMainState';

const Quests = () => {
  const { selectedGame } = useMainState();
  const { getUserQuests } = useGetUserGameData();
  const { mapDataToFilteredQuests } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${getUserQuests().length}/${mapDataToFilteredQuests(selectedGame).length}`}
      </CompletedQuantityTitle>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;