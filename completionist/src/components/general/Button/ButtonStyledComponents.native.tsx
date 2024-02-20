import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, LARGE_WIDTH } from '@styles/global.native';

interface StyledButtonProps {
  color: string;
  disabled: boolean;
}

interface StyledButtonNavigationProps {
	color: string;
}

export const StyledButtonDefault = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
  background-color: ${(props): string => props.color};
  opacity: ${(props): number => props.disabled ? 0.4 : 1};
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  justify-content: center;
	align-self: center;
`;

export const StyledButtonNavigation = styled.Pressable<StyledButtonNavigationProps>`
	width: ${LARGE_WIDTH}px;
	height: 45px;
	flex-direction: row;
	background-color: ${(props): string => props.color};
	border-radius: ${DEFAULT_BORDER_RADIUS}px;
	justify-content: space-between;
	align-items: center;
	margin: 16px 0px 16px 0px;
	padding: 0px 16px 0px 16px;
`;

export const StyledButtonText = styled.Pressable<StyledButtonProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
`;