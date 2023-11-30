import React from 'react';
import { View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';

const Home = () => {
  return (
    <StandardLayout>
      <QuestList />
    </StandardLayout>
  );
};

export default Home;