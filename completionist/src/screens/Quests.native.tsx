import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';

const Quests = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;