import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';
import Button from '../Button/Button.native';
import { LARGE_WIDTH, STANDARD_WIDTH } from '@styles/global.native';

export const listStyles = StyleSheet.create({
  scrollableContent: {
    paddingBottom: 24
  },
  listItemList: {
    alignItems: 'center'
  },
  selectableButton: {
    minHeight: 45,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  subSelectableButton: {
    marginLeft: 16
  },
  subTypeSelectableButton: {
    marginLeft: 32
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
  right: 16px;
`;

export const SubListHeaderTitle = styled(StyledText)`
  padding: 8px;
  margin-left: 16px;
  margin-right: 64px;
`;

export const SubListContainer = styled.View`
  margin-top: 8px;
`;

//background-color: ${props => props.color};
export const ListItemContainer = styled(Animated.View)`
  flex-direction: row;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${LARGE_WIDTH}px;
	border-radius: 10px;
`;

export const ListItemContentContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  padding-vertical: 8px;
  justify-content: center;
  width: ${() => Dimensions.get('window').width - 96}px;
`;

export const ListItemTitle = styled(StyledText)<ListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  max-width: 270px;
`;

export const ListShowMoreButton = styled(Button)`
  padding: 8px;
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
  padding: 8px;
`;

export const SelectListTitle = styled(StyledText)`
	margin-right: 32px;
`;