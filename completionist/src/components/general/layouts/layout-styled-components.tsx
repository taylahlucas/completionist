import styled from 'styled-components/native';
import {
  EXTRA_LARGE_PADDING,
  LARGE_PADDING,
  MID_PADDING,
  SMALL_PADDING,
  windowHeight,
} from '@styles/global';
import { IconButton } from '../icon';
import { StyledText } from '../text';

interface StandardLayoutContainerProps {
  color: string;
}

export const StandardLayoutContainer = styled.View<StandardLayoutContainerProps>`
  width: 100%;
  height: 100%;
  padding-top: ${windowHeight >= 700 ? EXTRA_LARGE_PADDING : MID_PADDING}px;
  padding-bottom: ${MID_PADDING}px;
  flex: 1;
  background-color: ${props => props.color};
  align-items: center;
`;

export const SheetContentLayoutContainer = styled.View`
  padding-horizontal: ${MID_PADDING}px;
  padding-top: ${MID_PADDING}px;
  padding-vertical: ${LARGE_PADDING}px;
  align-content: center;
`;

export const SheetContentHeaderContainer = styled.View`
  margin-top: ${SMALL_PADDING}px;
  padding-bottom: ${MID_PADDING}px;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SheetContentHeaderTitle = styled(StyledText)`
  padding-horizontal: ${LARGE_PADDING}px;
`;

export const SheetContentHeaderButton = styled(IconButton)`
  position: absolute;
  top: ${SMALL_PADDING}px;
  right: ${MID_PADDING}px;
`;
