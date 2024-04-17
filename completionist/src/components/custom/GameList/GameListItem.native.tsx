import React from 'react';
import { GameListItemContainer, GameListImage, GameItemTitle, GameItemTitleContainer } from './GameListItemStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useGetGameImage from './hooks/useGetGameImage.native';

interface GameListItemProps {
	game: SubscriptionData;
	enabledColor?: string;
  enabled: boolean;
  onPress: () => void;
}

const GameListItem = ({ game, enabledColor = 'grey', enabled, onPress }: GameListItemProps) => {
  const theme = useGetTheme();
	const { translateGameName } = useTranslateGameContent();
	const { getGameImage } = useGetGameImage();

  return (
    <GameListItemContainer
			testID={game.id}
      color={enabledColor}
      onPress={onPress}
    >
      <GameListImage source={getGameImage(game.id)} />
      {/* <GameItemScore color={theme.lightestGrey}>0-12</GameItemScore> */}
			<GameItemTitleContainer enabled={enabled}>
      	<GameItemTitle 
					type='SubHeading'
					color={theme.lightestGrey}
					align='left'
					ellipsizeMode='tail'
					numberOfLines={2}
				>
					{translateGameName(game.id)}
				</GameItemTitle>
			</GameItemTitleContainer>
    </GameListItemContainer>
  );
};

export default GameListItem;