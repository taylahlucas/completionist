import styled from 'styled-components/native';
import { windowWidth, windowHeight, DEFAULT_BORDER_RADIUS, SMALL_PADDING } from '@styles/global.native';
import IconButton from '../Icon/IconButton.native';

export const WikiWebViewContainer = styled.View`
	position: absolute;
	z-index: 3;
	width: ${windowWidth}px;
	height: ${windowHeight - 60}px;
	bottom: 0;
	border-radius: 20px;
`;

export const WikiWebViewCloseButton = styled(IconButton)`
	align-self: flex-end;
	width: 45px;
	padding: ${SMALL_PADDING}px;
	margin-top: ${SMALL_PADDING}px;
	margin-right: ${SMALL_PADDING}px;
`;