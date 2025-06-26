import styled from 'styled-components/native';
import { LARGE_WIDTH } from '@styles/global';
import IconButton from '../icon/icon-button';

interface TextInputContainerProps {
  width: number;
  height: number;
  multiline: boolean;
}

export const TextInputContainer = styled.View<TextInputContainerProps>`
  height: ${(props): number => props.height}px;
  width: ${(props): number => props.width}px;
  margin: 16px;
  padding-vertical: 8px;
  justify-content: ${props => (!props.multiline ? 'center' : 'none')};
`;

export const TextInputTextContainer = styled.View`
  height: 45px;
  width: ${LARGE_WIDTH}px;
  margin: 16px;
  padding-vertical: 8px;
`;

export const TextInputSecure = styled(IconButton)`
  margin-right: 16px;
  padding-vertical: 8px;
`;

export const TextInputIcon = styled(IconButton)`
  position: absolute;
  right: 16px;
  padding-vertical: 8px;
`;
