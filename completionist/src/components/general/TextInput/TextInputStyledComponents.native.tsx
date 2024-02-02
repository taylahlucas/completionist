import styled from 'styled-components/native';
import { LARGE_WIDTH } from '@styles/global.native';
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
  width: ${LARGE_WIDTH}px;
  margin: 16px;
  padding-vertical: 8px;
  justify-content: ${props => !props.multiline ? 'center' : 'none'};
`;

export const TextInputTextContainer = styled.View`
  height: 45px;
  width: ${LARGE_WIDTH}px;
  margin: 16px;
  padding-vertical: 8px;
`;

export const TextInputStyled = styled.TextInput<TextInputProps>`
  margin-left: ${props => props.hasLeftComponent ? 50 : 16}px;
  margin-right: 48px;
  padding: 2px;
`;

export const TextInputSecure = styled(IconButton)`
  margin-right: 16px;
  padding: 8px 0 8px;
`;

export const TextInputCancel = styled(IconButton)`
  position: absolute;
  right: 16px;
  padding: 8px 0 8px;
`;