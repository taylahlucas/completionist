import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles } from './GameListItemStyledComponents.native';
import GameListSectionDropdown from './GameListSectionDropdown.native';
import { useGameListItem } from './hooks/useGameListItem.native';

interface GameListProps {
  searchValue: string;
}

const GameList = ({ searchValue }: GameListProps) => {
  const { t } = useTranslation();
	const { viewModel, actions } = useGameListItem();

  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      <GameListSectionDropdown
				testID={'active-games'}
        title={t('common:active')}
				data={actions.filterGameList(viewModel.activeGames, true, searchValue)}
      />
      <GameListSectionDropdown 
				testID={'inactive-games'}
        title={t('common:inactive')}
				data={actions.filterGameList(viewModel.activeGames, false, searchValue)}
      />
    </ScrollableList>
  );
};

export default GameList;