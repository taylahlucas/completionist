import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles } from './GameListItemStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import GameListSectionDropdown from './GameListSectionDropdown.native';

interface GameListProps {
  searchValue: string;
}

const GameList = ({ searchValue }: GameListProps) => {
  const { t } = useTranslation();
  const { user } = useMainState();
  
  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      <GameListSectionDropdown 
        title={t('common:active')}
        data={user.subscription.data
          .filter(item => item.isActive)
          .filter(item => searchValue?.length > 0 ? (item.id as String).toLocaleLowerCase().includes(searchValue) : true)
        } 
      />
      <GameListSectionDropdown 
        title={t('common:inactive')}
        data={user.subscription.data
          .filter(item => !item.isActive)
          .filter(item => searchValue?.length > 0 ? (item.id as String).toLocaleLowerCase().includes(searchValue) : true)
        } 
      />
    </ScrollableList>
  );
};

export default GameList;