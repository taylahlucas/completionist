import React from 'react';
import {
  GameListItemHeaderContainer,
  GameListItemHeaderTitleContainer,
} from './';
import { StyledText, Icon, Seperator } from '@components/general';
import { useGameListItem } from './hooks';

interface GameListSectionHeaderProps {
  title: string;
  isOpen: boolean;
}

export const GameListSectionHeader = ({
  title,
  isOpen,
}: GameListSectionHeaderProps) => {
  const { viewModel } = useGameListItem();

  return (
    <GameListItemHeaderContainer>
      <GameListItemHeaderTitleContainer>
        <StyledText type="ListItemSubTitleBold" align="left">
          {title}
        </StyledText>
        <Icon
          name={isOpen ? 'arrow-drop-down' : 'arrow-right'}
          color={viewModel.theme.midGrey}
        />
      </GameListItemHeaderTitleContainer>
      <Seperator />
    </GameListItemHeaderContainer>
  );
};
