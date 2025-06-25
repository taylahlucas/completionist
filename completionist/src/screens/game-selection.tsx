import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { GameList } from '@components/custom';
import { NavigationHeader } from '@navigation/index';
import { useMainState } from '@redux/hooks';
import CustomSearchBar from '@components/general/custom-search-bar/custom-search-bar';
import { AuthScreenEnum } from '@utils/custom-enums';

export const GameSelection = () => {
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
