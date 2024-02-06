import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { useTranslation } from 'react-i18next';

const GameSelection = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <StandardLayout>
      <NavigationHeader 
        title={`${t('common:welcome')}\n${user.name}`}
        leftAction={'subscriptions'} 
        rightAction={'logout'} 
      />
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