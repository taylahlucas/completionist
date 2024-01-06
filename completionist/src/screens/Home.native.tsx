import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import useInitSettingsConfig from '@data/hooks/useInitSettingsConfig';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Home = () => {

  useInitSettingsConfig();
  
  return (
    <StandardLayout>
      <NavigationHeader title={'Select a game'} leftAction={'none'} rightAction={'logout'} />
      <GameList />
    </StandardLayout>
  );
};

export default Home;