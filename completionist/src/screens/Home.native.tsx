import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import StyledText from '@components/general/Text/StyledText.native';
import useInitSettingsConfig from '@data/hooks/useInitSettingsConfig';

const Home = () => {

  useInitSettingsConfig();
  
  return (
    <StandardLayout>
      <StyledText style={{ marginTop: 32 }}>Select a game</StyledText>
      <GameList />
    </StandardLayout>
  );
};

export default Home;