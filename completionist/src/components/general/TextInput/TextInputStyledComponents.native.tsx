import { Dimensions } from 'react-native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import styled from 'styled-components/native';
import IconButton from '../Icon/IconButton.native';

interface TextInputContainerProps {
  color: string;
  multiline: boolean;
}

interface TextInputProps {
  color: string;
  hasLeftComponent: boolean;
}

export const TextInputContainer = styled.View<TextInputContainerProps>`
  height: 45px;
  width: ${Dimensions.get('window').width - 32}px;
  margin: 16px;
  padding-vertical: 8px;
  background-color: ${(props): string => props.color};
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  justify-content: ${props => !props.multiline ? 'center' : 'none'};
`;

export const TextInputStyled = styled.TextInput<TextInputProps>`
  margin-left: ${props => props.hasLeftComponent ? 50 : 16}px;
  margin-right: 48px;
`;

export const TextInputCancel = styled(IconButton)`
  position: absolute;
  right: 16px;
  padding-vertical: 8px;
`;