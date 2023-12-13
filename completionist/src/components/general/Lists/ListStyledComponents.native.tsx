import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';

export const listStyles = StyleSheet.create({
  scrollableContent: {
    alignItems: 'center', 
    alignSelf: 'center',
    paddingBottom: 100
  },
  scrollableList: {
    padding: 16
  },
  selectableButton: {
    justifyContent: 'center',
    height: 50,
    borderRadius: DEFAULT_BORDER_RADIUS,
  }
});

interface ListItemStyleProps {
  color: string;
}

export const ListItemHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ListItemHeaderCountTitle = styled(StyledText)`
  position: absolute;
  right: 16px;
`;

export const SubListHeaderTitle = styled(StyledText)`
  padding: 8px;
  margin-left: 16px;
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

export const ListItemTitle = styled(StyledText)<ListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
  max-width: 270px;
`;