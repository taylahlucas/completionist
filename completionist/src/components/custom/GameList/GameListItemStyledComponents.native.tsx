import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, LARGE_WIDTH, LARGE_PADDING } from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

export const styles = StyleSheet.create({
  scrollableContent: {
    flexDirection: 'column'
  }
})

interface GameListItemContainerProps {
  color: string;
}

interface GameItemTitleContainerProps {
	enabled: boolean;
}

export const GameListItemContainer = styled.Pressable<GameListItemContainerProps>`
  width: 150px;
  height: 150px;
  margin: 8px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  border-color: ${(props): string => props.color};
  border-width: 2px;
`;

export const GameListImage = styled.Image`
  width: 148px;
  height: 148px;
  position: absolute;
  opacity: 0.3;
`;

export const GameItemTitleContainer = styled.View<GameItemTitleContainerProps>`
	width: 150px;
	height: 150px;
	opacity: ${props => props.enabled ? 1 : 0.5};
`;

export const GameItemTitle = styled(StyledText)`
	max-width: 125px;
	position: absolute;
	right: 12px;
	bottom: 8px;
`;

export const GameItemScore = styled(StyledText)`
  position: absolute;
  right: 16px;
  top: 8px;
`;

export const GameListItemHeaderContainer = styled.View`
  flex-direction: column;
  width: ${LARGE_WIDTH}px;
  height: 35px;
`;

export const GameListItemHeaderTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GameSelectionChangesLeftContainer = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	margin-left: ${LARGE_PADDING}px;
	padding-bottom: 8px;
`;