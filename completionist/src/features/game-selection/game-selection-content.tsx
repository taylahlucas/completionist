import React, { useMemo, useState } from 'react';
import {
  Condition,
  CustomSearchBar,
  ScrollableList,
} from '@components/general';
import { GameListSectionDropdown, gameListStyles } from '@components/custom';
import { useTranslation } from 'react-i18next';
import { useMainState } from '@redux/hooks';
import { allGameData } from '@utils/configs';
import { filterGameList } from '@components/custom/game-list/hooks';

export const GameSelectionContent = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState<string>('');

  const disabledGameData = useMemo(() => {
    const activeGames = Object.values(user.gameData ?? {});

    return allGameData.filter(game => {
      return !activeGames.find(activeGame => activeGame.id === game.id);
    });
  }, [user.gameData, allGameData]);

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
          data={filterGameList(user.gameData, searchValue, t)}
        />
        <Condition condition={disabledGameData.length > 0}>
          <GameListSectionDropdown
            testID="inactive-games"
            type="inactive"
            title={t('common:inactive')}
            data={filterGameList(disabledGameData, searchValue, t)}
          />
        </Condition>
      </ScrollableList>
    </>
  );
};
