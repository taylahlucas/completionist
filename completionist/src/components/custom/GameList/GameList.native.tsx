import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles } from './GameListItemStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import GameListSectionDropdown from './GameListSectionDropdown.native';
import useFilterGameList from './hooks/useFilterGameList.native';

interface GameListProps {
  searchValue: string;
}

const GameList = ({ searchValue }: GameListProps) => {
  const { t } = useTranslation();
  const { user } = useMainState();
	const { filterGameList } = useFilterGameList();

  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      <GameListSectionDropdown
				testID={'active-games'}
        title={t('common:active')}
				data={filterGameList(user.activeGames, true, searchValue)}
      />
      <GameListSectionDropdown 
				testID={'inactive-games'}
        title={t('common:inactive')}
				data={filterGameList(user.activeGames, false, searchValue)}
      />
    </ScrollableList>
  );
};

export default GameList;