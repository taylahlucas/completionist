import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';

const GameSelection = () => {
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <StandardLayout>
      <NavigationHeader title={`Welcome\n${user.name}`} leftAction={'subscriptions'} rightAction={'logout'} />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <GameList searchValue={searchValue} />
    </StandardLayout>
  );
};

export default GameSelection;