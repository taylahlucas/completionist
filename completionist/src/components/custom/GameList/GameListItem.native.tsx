import React from 'react';
import { ImageURISource } from 'react-native';
import { GameListItemContainer, GameListImage, GameItemTitle } from './GameListItemStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface GameListItemProps {
	testID?: string;
  title: string;
	enabledColor?: string;
  enabled: boolean;
  imageUrl: ImageURISource;
  onPress: () => void;
}

const GameListItem = ({ testID, title, enabledColor = 'grey', enabled, imageUrl, onPress }: GameListItemProps) => {
  const theme = useGetTheme();

  return (
    <GameListItemContainer
			testID={testID}
      color={enabledColor}
      disabled={!enabled}
      onPress={onPress}
    >
      <GameListImage source={imageUrl} />
      {/* <GameItemScore color={theme.lightestGrey}>0-12</GameItemScore> */}
      <GameItemTitle type={'Heading'} color={enabled ? theme.lightestGrey : theme.midGrey}>{title}</GameItemTitle>
    </GameListItemContainer>
  );
};

export default GameListItem;