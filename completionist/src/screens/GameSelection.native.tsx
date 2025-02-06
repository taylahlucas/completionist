import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { AuthScreenEnum } from '@utils/CustomEnums';

const GameSelection = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState('');

  return (
    <StandardLayout>
      <NavigationHeader
        id={AuthScreenEnum.GameSelection}
        title={`${t('common:welcome')}\n${user.username}`}
        leftAction="achievements"
        rightAction="settings"
      />
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <GameList searchValue={searchValue.toLocaleLowerCase()} />
    </StandardLayout>
  );
};

export default GameSelection;
