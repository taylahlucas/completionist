import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameListItemHeaderContainer, GameListItemHeaderTitleContainer } from './GameListItemStyledComponents.native';
import Seperator from '@components/general/Seperator.native';
import Icon from '@components/general/Icon/Icon.native';

interface GameListSectionHeaderProps {
  title: string;
  isOpen: boolean;
}

const GameListSectionHeader = ({ title, isOpen }: GameListSectionHeaderProps) => {
  const theme = useGetTheme();

  return (
    <GameListItemHeaderContainer>
      <GameListItemHeaderTitleContainer>
        <StyledText 
          type={'ListItemSubTitleBold'} 
          align='left'
        >
          {title}
        </StyledText>
        <Icon 
          name={isOpen ? 'arrow-drop-down' : 'arrow-right'}
          color={theme.midGrey}
        />
      </GameListItemHeaderTitleContainer>
      <Seperator />
    </GameListItemHeaderContainer>
  );
};

export default GameListSectionHeader;