import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Condition,
  CustomSearchBar,
  ScrollableList,
} from '@components/general';
import { GameListSectionDropdown, gameListStyles } from '@components/custom';
import { allGameData } from '@utils/configs';
import { useFilterGameList } from '@utils/hooks';
import { useAuthState } from '@redux/auth';

export const GameSelectionContent = () => {
  const { t } = useTranslation();
  const { user } = useAuthState();
  const { filterGameList } = useFilterGameList();
  const [searchValue, setSearchValue] = useState<string>('');

  const disabledGameData = useMemo(() => {
    const activeGames = Object.values(user?.gameData ?? {});

    return allGameData.filter(game => {
      return !activeGames.find(activeGame => activeGame.id === game.id);
    });
  }, [user?.gameData, allGameData]);

  return (
    <>
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <ScrollableList contentContainerStyle={gameListStyles.scrollableContent}>
        <GameListSectionDropdown
          testID="active-games"
          type="active"
          title={t('common:active')}
          // TODO: Handle no user
          data={user ? filterGameList(user.gameData, searchValue) : []}
        />
        <Condition condition={disabledGameData.length > 0}>
          <GameListSectionDropdown
            testID="inactive-games"
            type="inactive"
            title={t('common:inactive')}
            data={filterGameList(disabledGameData, searchValue)}
          />
        </Condition>
      </ScrollableList>
    </>
  );
};
