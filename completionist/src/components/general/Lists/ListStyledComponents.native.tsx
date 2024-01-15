import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import ScrollableList from './ScrollableList.native';
import Button from '../Button/Button.native';

export const listStyles = StyleSheet.create({
  scrollableContent: {
    alignItems: 'center', 
    alignSelf: 'center',
    paddingBottom: 100
  },
  scrollableList: {
    padding: 16
  },
  listItemScrollableList: {
    paddingBottom: 50
  },
  selectableButton: {
    justifyContent: 'center',
    height: 45,
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
`;

export const ListItemScrollView = styled(ScrollableList)`
  max-height: 300px;
`;

export const SubListContainer = styled.View`
  margin-top: 8px;
`;

export const ListItemContainer = styled.View<ListItemStyleProps>`
  flex-direction: row;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${() => Dimensions.get('window').width - 32}px;
  background-color: ${props => props.color};
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

export const ListItemScrollableList = styled(ScrollableList)`
  flex: 1;
  max-height: 300px;
`;

export const ListShowMoreButton = styled(Button)`
  padding: 8px;
`;

export const ListItemLocationContainer = styled.View`
  flex-direction: row;
`;

export const SelectionListContainer = styled.View``;

export const SelectionListItemContainer = styled.View`
  flex-direction: row;
`;