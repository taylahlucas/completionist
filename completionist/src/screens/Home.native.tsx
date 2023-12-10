import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import GameList from '@components/custom/GameList/GameList.native';

const Home = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Select a game'} />
      <GameList />
    </StandardLayout>
  );
};

export default Home;