import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import { mappedQuests } from '@data/functions';
import useMainState from 'src/redux/hooks/useMainState.native';

const Quests = () => {
  const { completedQuestIds } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>
        {`${completedQuestIds.length}/${mappedQuests.length}`}
      </StyledText>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;