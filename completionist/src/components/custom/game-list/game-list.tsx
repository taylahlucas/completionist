import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollableList } from '@components/general/Lists';
import { styles } from './game-list-styled-components';
import { GameListSectionDropdown } from './';
import { useGameList } from './hooks';
import { Condition } from '@components/general';

interface GameListProps {
  searchValue: string;
}

export const GameList = ({ searchValue }: GameListProps) => {
  const { t } = useTranslation();
  const { viewModel, actions } = useGameList();

  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      <GameListSectionDropdown
        testID={'active-games'}
        type="active"
        title={t('common:active')}
        data={actions.filterGameList(
          viewModel.activeGames,
          true,
          searchValue,
          t,
        )}
      />
      <Condition condition={viewModel.disabledGames.length > 0}>
        <GameListSectionDropdown
          testID={'inactive-games'}
          type="inactive"
          title={t('common:inactive')}
          data={actions.filterGameList(
            viewModel.disabledGames,
            false,
            searchValue,
            t,
          )}
        />
      </Condition>
    </ScrollableList>
  );
};
