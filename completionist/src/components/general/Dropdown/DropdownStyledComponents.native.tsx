import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import IconButton from '../Icon/IconButton.native';
import StyledText from '../Text/StyledText.native';

interface DropdownSelectionContainerProps {
  color: string;
}

export const DropdownSelectionContainer = styled.Pressable<DropdownSelectionContainerProps>`
  width: ${Dimensions.get('window').width - 64}px;
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
  align-items: center;
`;

export const DropdownSelectionTitle = styled(StyledText)`
  left: 32px;
`;

export const DropdownSelectionItemTitle = styled(StyledText)`
  left: 24px;
`;


export const DropdownSelectionIconButton = styled(IconButton)`
  positon: absolute;
  right: 16px;
`;

export const DropdownSelectionContentContainer = styled.View`
  max-height: 200px;
  position: absolute;
  align-self: center;
  align-items: center;
  top: 42px;
  overflow: scroll;
`;

interface DropdownSelectionContentItemProps {
  color: string;
  last?: boolean;
}

export const DropdownSelectionContentItem = styled.Pressable<DropdownSelectionContentItemProps>`
  background-color: ${(props): string => props.color}; 
  width: ${Dimensions.get('window').width - 64}px;
  height: 45px;
  padding: 8px;
  justify-content: center;
  border-bottom-left-radius: ${(props): number => !!props.last ? DEFAULT_BORDER_RADIUS : 0}px;
  border-bottom-right-radius: ${(props): number => !!props.last ? DEFAULT_BORDER_RADIUS : 0}px;
`;

interface DropdownPressableProps {
  enabled: boolean;
}

export const DropdownPressable = styled.Pressable<DropdownPressableProps>`
  opacity: ${(props): number => props.enabled ? 1 : 0.4};
`;