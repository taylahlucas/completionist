import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles } from './GameListItemStyledComponents.native';
import GameListSectionDropdown from './GameListSectionDropdown.native';
import { useGameList } from './hooks/useGameList.native';

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
        type='active'
        title={t('common:active')}
				data={actions.filterGameList(viewModel.activeGames, true, searchValue)}
      />
      <GameListSectionDropdown 
				testID={'inactive-games'}
        type='inactive'
        title={t('common:inactive')}
				data={actions.filterGameList(viewModel.disabledGames, false, searchValue)}
      />
    </ScrollableList>
  );
};

export default GameList;