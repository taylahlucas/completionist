import React from 'react';
import {
  GameListItemHeaderContainer,
  GameListItemHeaderTitleContainer,
} from './';
import { StyledText, Icon, Seperator } from '@components/general';
import useGetTheme from '@styles/hooks/use-get-theme';

interface GameListSectionHeaderProps {
  title: string;
  isOpen: boolean;
}

export const GameListSectionHeader = ({
  title,
  isOpen,
}: GameListSectionHeaderProps) => {
  const theme = useGetTheme();

  return (
    <GameListItemHeaderContainer>
      <GameListItemHeaderTitleContainer>
        <StyledText type="ListItemSubTitleBold" align="left">
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
