import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, LARGE_WIDTH } from '@styles/global';
import { StyledText } from '@components/general';

export const gameListStyles = StyleSheet.create({
  scrollableContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

interface GameListItemContainerProps {
  color: string;
  isLargeWidth?: boolean;
}

interface GameItemTitleContainerProps {
  enabled: boolean;
}

export const GameListItemContainer = styled.Pressable<GameListItemContainerProps>`
  width: ${(props): string => (props.isLargeWidth ? '400px' : '150px')};
  height: 150px;
  margin: 8px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  border-color: ${(props): string => props.color};
  border-width: 1.5px;
`;

export const GameListImage = styled.Image`
  width: 148px;
  height: 148px;
  position: absolute;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
`;

export const GameItemTitleContainer = styled.View<GameItemTitleContainerProps>`
  width: 150px;
  height: 150px;
  opacity: ${props => (props.enabled ? 1 : 0.5)};
`;

export const GameItemTitle = styled(StyledText)`
  max-width: 125px;
  position: absolute;
  right: 12px;
  bottom: 8px;
`;

export const GameItemScore = styled(StyledText)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const GameListItemHeaderContainer = styled.View`
  flex-direction: column;
  width: ${LARGE_WIDTH}px;
  height: 35px;
`;

export const GameListItemHeaderTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GameListDropdownContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 8px;
  padding-left: 16px;
`;
