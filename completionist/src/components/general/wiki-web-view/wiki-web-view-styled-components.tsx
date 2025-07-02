import styled from 'styled-components/native';
import {
  windowWidth,
  windowHeight,
  isSmallScreen,
  SMALL_PADDING,
} from '@styles/global';
import { IconButton } from '../icon';

export const WikiWebViewContainer = styled.View`
  position: absolute;
  z-index: 3;
  width: ${windowWidth}px;
  height: ${windowHeight - (isSmallScreen ? 40 : 80)}px;
  bottom: 0;
  border-radius: 20px;
`;

export const WikiWebViewCloseButton = styled(IconButton)`
  align-self: flex-end;
  width: 45px;
  padding: ${SMALL_PADDING}px;
  margin-right: ${SMALL_PADDING}px;
`;
