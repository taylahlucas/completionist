import React from 'react';
import { ImageURISource } from 'react-native';
import { GameListItemContainer, GameListImage, GameItemTitle, GameItemScore } from './GameListItemStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface GameListItemProps {
  title: string;
  enabled: boolean;
  imageUrl: ImageURISource;
  onPress: () => void;
}

const GameListItem = ({ title, enabled, imageUrl, onPress }: GameListItemProps) => {
  const theme = useGetTheme();

  return (
    <GameListItemContainer 
      color={theme.midGrey} 
      disabled={!enabled}
      onPress={onPress}
    >
      <GameListImage source={imageUrl} />
      {/* <GameItemScore color={theme.lightestGrey}>0-12</GameItemScore> */}
      <GameItemTitle type={'Heading'} color={theme.lightestGrey}>{title}</GameItemTitle>
    </GameListItemContainer>
  );
};

export default GameListItem;