import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';
import StyledText from '../components/general/Text/StyledText.native';

const Quests = () => {
  return (
    <StandardLayout>
      <StyledText>Quests</StyledText>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;