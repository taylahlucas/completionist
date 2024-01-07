import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import IconButton from '../Icon/IconButton.native';

interface TextInputContainerProps {
  height: number;
  multiline: boolean;
}

interface TextInputProps {
  color: string;
  hasLeftComponent: boolean;
}

export const TextInputContainer = styled.View<TextInputContainerProps>`
  height: ${(props): number => props.height}px;
  width: ${Dimensions.get('window').width - 32}px;
  margin: 16px;
  padding-vertical: 8px;
  justify-content: ${props => !props.multiline ? 'center' : 'none'};
`;

export const TextInputTextContainer = styled.View`
  height: 45px;
  width: ${Dimensions.get('window').width - 32}px;
  margin: 16px;
  padding-vertical: 8px;
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