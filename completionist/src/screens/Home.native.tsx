import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';

const Home = () => {
  const { user } = useMainState();
  return (
    <StandardLayout>
      <NavigationHeader title={`Welcome ${user.name}`} leftAction={'none'} rightAction={'logout'} />
      <StyledText type={'ListItemSubTitleBold'}>Select a game</StyledText>
      <GameList />
    </StandardLayout>
  );
};

export default Home;