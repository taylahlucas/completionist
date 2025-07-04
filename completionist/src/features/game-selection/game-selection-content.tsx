import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout, CustomSearchBar } from '@components/general';
import { GameList } from '@components/custom';
import { NavigationHeader } from '@navigation/index';
import { useMainState } from '@redux/hooks';
import { AuthScreenEnum } from '@utils/index';

export const GameSelectionContent = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <GameList searchValue={searchValue.toLocaleLowerCase()} />
    </>
  );
};
