import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';

interface GameListItemContainerProps {
  color: string;
}

export const GameListItemContainer = styled.Pressable<GameListItemContainerProps>`
  width: 150px;
  height: 150px;
  margin: 8px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
  justify-content: center;
`;