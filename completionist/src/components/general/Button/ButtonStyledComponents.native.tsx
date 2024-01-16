import { Dimensions } from 'react-native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';
import styled from 'styled-components/native';

interface StyledButtonProps {
  color: string;
  disabled: boolean;
}

export const StyledButtonDefault = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
  background-color: ${(props): string => props.color};
  opacity: ${(props): number => props.disabled ? 0.4 : 1};
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  justify-content: center;
`;

export const StyledButtonText = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
`;