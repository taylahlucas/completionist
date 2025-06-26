import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout, CustomSearchBar } from '@components/general';
import { GameList } from '@components/custom';
import { NavigationHeader } from '@navigation/index';
import { useMainState } from '@redux/hooks';
import { AuthScreenEnum } from '@utils/index';

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
