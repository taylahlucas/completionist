import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Quests = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;