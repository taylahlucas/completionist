import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, LARGE_WIDTH, STANDARD_WIDTH, MID_WIDTH, MID_PADDING, windowWidth } from '@styles/global.native';
import StyledText from '../Text/StyledText.native';

interface DropdownSelectionContainerProps {
	color: string;
}

export const DropdownSelectionContainer = styled.Pressable<DropdownSelectionContainerProps>`
  width: ${STANDARD_WIDTH}px;
  height: 45px;
  z-index: -1;
  align-self: center;
  justify-content: center;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
`;

export const DropdownSelectionInnerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${MID_WIDTH}px;
  align-items: center;
`;

export const DropdownSelectionTitle = styled(StyledText)`
  margin-left: ${MID_PADDING}px;
  width: 100%;
`;

export const DropdownSelectionItemTitle = styled(StyledText)`
  left: 24px;
`;

interface DropdownSelectionContentItemProps {
	color: string;
	last?: boolean;
}

export const DropdownSelectionContentItem = styled.Pressable<DropdownSelectionContentItemProps>`
  background-color: ${(props): string => props.color}; 
	width: ${windowWidth - 64}px;
  height: 45px;
  justify-content: center;
  border-bottom-left-radius: ${(props): number => !!props.last ? DEFAULT_BORDER_RADIUS : 0}px;
  border-bottom-right-radius: ${(props): number => !!props.last ? DEFAULT_BORDER_RADIUS : 0}px;
`;

export const DropdownContainer = styled.View`
	margin-top: 4px; 
	margin-bottom: 4px; 
	z-index: 2;
`;

export const DropdownTitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	align-self: center;
	justify-content: space-between;
	width: ${LARGE_WIDTH}px;
`;

interface DropdownPressableProps {
	enabled: boolean;
}

export const DropdownPressable = styled.Pressable<DropdownPressableProps>`
  opacity: ${(props): number => props.enabled ? 1 : 0.4};
`;