import React from 'react';
import GameListItem from './GameListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { styles } from './GameListItemStyledComponents.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetGameImage from './hooks/useGetGameImage.native';

const GameList = () => {
  const navigation = useReactNavigation();
  const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
  const { user } = useMainState();
  const { getGameImage } = useGetGameImage();
  
  // TODO: get completion percentage
  return (
    <ScrollableList contentContainerStyle={styles.scrollableContent}>
      {user.subscription.map((game, index) => (
        <GameListItem
          key={index}
          title={game.id}
          enabled={game.isActive}
          imageUrl={getGameImage(game.id)}
          onPress={(): void => {
            reset();
            setSelectedGame(game.id);
            setSelectedGameSettings(game.id);
            navigation.navigate(ScreenEnum.Quests);
          }}
        />
      ))}
    </ScrollableList>
  );
};

export default GameList;