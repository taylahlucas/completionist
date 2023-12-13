import React from 'react';
import GameListItem from './GameListItem.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Subscription } from '@utils/CustomInterfaces';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

const GameList = () => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const games: Subscription[] = [
    {
      id: SubscriptionTypeEnum.SKYRIM,
      isActive: true
    },
    {
      id: SubscriptionTypeEnum.FALLOUT_4,
      isActive: true
    }
  ];

  return (
    <ScrollableList contentContainerStyle={{ flexDirection: 'row' }}>
      {games.map((game, index) => (
        <GameListItem 
          key={index}
          color={theme.midGrey}
          title={game.id} 
          enabled={game.isActive}
          onPress={() => navigation.navigate(ScreenEnum.Quests)}
        />
      ))}
    </ScrollableList>
  );
};

export default GameList;