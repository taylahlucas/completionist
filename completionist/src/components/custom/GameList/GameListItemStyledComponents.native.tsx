import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

export const styles = StyleSheet.create({
  scrollableContent: {
    flexDirection: 'column'
  }
})

interface GameListItemContainerProps {
  color: string;
}

export const GameListItemContainer = styled.Pressable<GameListItemContainerProps>`
  width: 150px;
  height: 150px;
  margin: 8px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  border-color: ${(props): string => props.color};
  border-width: 2px;
`;

export const GameListImage = styled.Image`
  width: 148px;
  height: 148px;
  position: absolute;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  opacity: 0.3;
`;

export const GameItemTitle = styled(StyledText)`
  position: absolute;
  right: 16px;
  bottom: 8px;
`;

export const GameItemScore = styled(StyledText)`
  position: absolute;
  right: 16px;
  top: 8px;
`;