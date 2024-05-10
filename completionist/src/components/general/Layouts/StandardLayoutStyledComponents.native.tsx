import styled from 'styled-components/native';
import { SMALL_PADDING, MID_PADDING } from '@styles/global.native';

interface StandardLayoutContainerProps {
  color: string;
}

export const StandardLayoutContainer = styled.View<StandardLayoutContainerProps>`
  width: 100%;
  height: 100%;
	padding-top: ${MID_PADDING}px;
	padding-bottom: ${MID_PADDING}px;
  flex: 1;
  background-color: ${props => props.color};
	align-items: center;
`;