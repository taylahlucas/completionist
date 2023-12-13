import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import QuestList from '@components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import StyledText from '@components/general/Text/StyledText.native';
import { mappedQuests } from '@data/functions';
import useMainState from '@redux/hooks/useMainState';

const Quests = () => {
  const { user } = useMainState();

  console.log("HEREEEE: ", user.data)

  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <StyledText style={{ marginTop: 16 }} type={'ListItemTitleBold'}>
        {`${user.data.skyrim.quests.length}/${mappedQuests.length}`}
      </StyledText>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;