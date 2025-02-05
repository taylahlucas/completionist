import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollableList } from '@components/general/Lists/index';
import { styles } from './GameListItemStyledComponents.native';
import GameListSectionDropdown from './GameListSectionDropdown.native';
import { useGameList } from './hooks/useGameList.native';
import { Condition } from '@components/general';

interface GameListProps {
  searchValue: string;
}

const GameList = ({ searchValue }: GameListProps) => {
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

export default GameList;
