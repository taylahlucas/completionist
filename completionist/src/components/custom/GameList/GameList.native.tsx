import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles } from './GameListItemStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import GameListSectionDropdown from './GameListSectionDropdown.native';

interface GameListProps {
  searchValue: string;
}

const GameList = ({ searchValue }: GameListProps) => {
  const { user } = useMainState();

  // TODO: get completion percentage
  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      <GameListSectionDropdown 
        title={'ACTIVE'}
        data={user.subscription
          .filter(item => item.isActive)
          .filter(item => searchValue?.length > 0 ? (item.id as String).includes(searchValue) : true)
        } 
      />
      <GameListSectionDropdown 
        title={'INACTIVE'}
        data={user.subscription
          .filter(item => !item.isActive)
          .filter(item => searchValue?.length > 0 ? (item.id as String).includes(searchValue) : true)
        } 
      />
    </ScrollableList>
  );
};

export default GameList;