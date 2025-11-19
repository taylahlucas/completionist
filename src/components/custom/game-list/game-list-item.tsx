import React from 'react';
import {
  GameListItemContainer,
  GameListImage,
  GameItemTitle,
  GameItemTitleContainer,
  GameItemScore,
} from './';
import { GameData, FlowType } from '@utils/index';
import { Condition } from '@components/general';
import { useTranslateGameContent } from '@data/hooks';
import { getGameImage, getPriceForGame } from '@data/helpers';
import useGetTheme from '@styles/hooks/use-get-theme';

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
  const theme = useGetTheme();
  const { translateGameName } = useTranslateGameContent();

  return (
    <GameListItemContainer
      testID={`game-list-item-${game.id}`}
      color={enabledColor}
      onPress={onPress}>
      <GameListImage
        source={getGameImage(game.id)}
        style={{ opacity: enabled ? 0.5 : 0.2 }}
      />
      <Condition condition={flow === 'home' && !enabled}>
        <GameItemScore type="ListItemTitleBold" color={theme.lightestGrey}>
          {getPriceForGame(game.tier).title}
        </GameItemScore>
      </Condition>
      <GameItemTitleContainer enabled={enabled}>
        <GameItemTitle
          type="SubHeading"
          color={theme.lightestGrey}
          align="left"
          ellipsizeMode="tail"
          numberOfLines={2}>
          {translateGameName(game.id)}
        </GameItemTitle>
      </GameItemTitleContainer>
    </GameListItemContainer>
  );
};
