import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, MID_PADDING, windowWidth } from '@styles/global.native';

interface StyledButtonProps {
  color: string;
  disabled: boolean;
}

interface StyledButtonNavigationProps {
	color: string;
}

export const StyledButtonDefault = styled.Pressable<StyledButtonProps>`
  width: ${windowWidth - 64}px;
  height: 45px;
  background-color: ${(props): string => props.color};
  opacity: ${(props): number => props.disabled ? 0.4 : 1};
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  justify-content: center;
	align-self: center;
`;

export const StyledButtonNavigation = styled.Pressable<StyledButtonNavigationProps>`
	width: ${windowWidth - 64}px;
	height: 45px;
	flex-direction: row;
	background-color: ${(props): string => props.color};
	border-radius: ${DEFAULT_BORDER_RADIUS}px;
	justify-content: space-between;
	align-self: center;
	align-items: center;
	margin: ${MID_PADDING}px 0px ${MID_PADDING}px 0px;
	padding: 0px ${MID_PADDING}px 0px ${MID_PADDING}px;
`;

export const StyledButtonText = styled.Pressable<StyledButtonProps>`
  width: ${windowWidth - 64}px;
  height: 45px;
`;

export const FooterButtonView = styled.View`
	flex: 1;
	position: absolute;
	width: 100%;
	height: 100px; 
	bottom: 0px;
	justify-content: center;
`;