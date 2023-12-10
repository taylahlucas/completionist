import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import { GameListItemContainer } from './GameListItemStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface GameListItemProps {
  color: string;
  title: string;
  enabled: boolean;
  onPress: () => void;
}

const GameListItem = ({ color, title, enabled, onPress }: GameListItemProps) => {
  const theme = useGetTheme();

  return (
    <GameListItemContainer 
      color={color} 
      disabled={!enabled}
      onPress={onPress}
    >
      <StyledText color={theme.lightestGrey}>{title}</StyledText>
    </GameListItemContainer>
  );
};

export default GameListItem;