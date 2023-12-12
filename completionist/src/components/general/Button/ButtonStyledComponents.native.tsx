import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface StyledButtonProps {
  color: string;
}

export const StyledButtonDefault = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
  background-color: ${(props): string => props.color};
  border-radius: 5px;
  justify-content: center;
`;

export const StyledButtonText = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
`;