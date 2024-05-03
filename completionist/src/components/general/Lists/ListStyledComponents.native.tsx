import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS, SMALL_PADDING, MID_PADDING, LARGE_PADDING, windowWidth } from '@styles/global.native';
import Button from '../Button/Button.native';
import { LARGE_WIDTH } from '@styles/global.native';

export const listStyles = StyleSheet.create({
  scrollableContent: {
    paddingBottom: 24,
		alignItems: 'center'
  },
  listItemList: {
    alignItems: 'center',
		paddingBottom: 20
  },
  selectableButton: {
    minHeight: 45,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  subSelectableButton: {
    marginLeft: MID_PADDING
  },
  subTypeSelectableButton: {
    marginLeft: LARGE_PADDING
  },
});

interface ListItemStyleProps {
  color: string;
  backgroundColor?: string;
}

export const ListItemHeaderContainer = styled.View<ListItemStyleProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  border-bottom-color: ${props => props.color};
  border-bottom-width: 1px;
`;

export const ListItemHeaderCountTitle = styled(StyledText)`
  position: absolute;
  right: ${MID_PADDING}px;
`;

export const SubListHeaderTitle = styled(StyledText)`
  padding: ${SMALL_PADDING}px;
  margin-left: ${MID_PADDING}px;
  margin-right: 64px;
`;

export const SubListContainer = styled.View`
  margin-top: ${SMALL_PADDING}px;
`;

export const ListItemContainer = styled(Animated.View)`
  flex-direction: row;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-top: ${SMALL_PADDING}px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${LARGE_WIDTH}px;
`;

export const ListItemContentContainer = styled.View`
  flex-direction: column;
  padding-left: ${MID_PADDING}px;
  padding-vertical: ${SMALL_PADDING}px;
  justify-content: center;
  width: ${() => windowWidth - 96}px;
`;

export const ListItemTitle = styled(StyledText)<ListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  max-width: 270px;
`;

export const ListShowMoreButton = styled(Button)`
  padding: ${SMALL_PADDING}px;
`;

export const ListItemLocationContainer = styled.View`
  flex-direction: row;
`;

export const SelectionListContainer = styled.View`
  width: ${LARGE_WIDTH}px;
  padding-left: 24px;
	padding-right: 24px;
`;

export const SelectionListItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${SMALL_PADDING}px;
`;

export const SelectListTitle = styled(StyledText)`
	margin-right: ${LARGE_PADDING}px;
`;