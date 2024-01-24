import React from 'react';
import GameListItem from './GameListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { styles } from './GameListItemStyledComponents.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetGameImage from './hooks/useGetGameImage.native';
import StyledText from '@components/general/Text/StyledText.native';
import { View } from 'react-native';
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
        data={user.subscription.filter(item => item.isActive)} 
      />
      <GameListSectionDropdown 
        title={'INACTIVE'}
        data={user.subscription.filter(item => !item.isActive)} 
      />
    </ScrollableList>
  );
};

export default GameList;