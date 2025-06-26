import React from 'react';
import {
  GameListItemContainer,
  GameListImage,
  GameItemTitle,
  GameItemTitleContainer,
  GameItemScore,
} from './';
import { GameData, FlowType } from '@utils/index';
import { useGameListItem } from './hooks';
import { Condition } from '@components/general';

interface GameListItemProps {
  flow?: FlowType;
  game: GameData;
  enabledColor?: string;
  enabled: boolean;
  onPress: () => void;
}

export const GameListItem = ({
  flow = 'home',
  game,
  enabledColor = 'grey',
  enabled,
  onPress,
}: GameListItemProps) => {
  const { viewModel, actions } = useGameListItem();

  return (
    <GameListItemContainer
      testID={game.id}
      color={enabledColor}
      onPress={onPress}>
      <GameListImage
        source={actions.getGameImage(game.id)}
        style={{ opacity: enabled ? 0.5 : 0.2 }}
      />
      <Condition condition={flow === 'home' && !enabled}>
        <GameItemScore
          type="ListItemTitleBold"
          color={viewModel.theme.lightestGrey}>
          {actions.getPriceForGame(game.tier).title}
        </GameItemScore>
      </Condition>
      <GameItemTitleContainer enabled={enabled}>
        <GameItemTitle
          type="SubHeading"
          color={viewModel.theme.lightestGrey}
          align="left"
          ellipsizeMode="tail"
          numberOfLines={2}>
          {actions.translateGameName(game.id)}
        </GameItemTitle>
      </GameItemTitleContainer>
    </GameListItemContainer>
  );
};
