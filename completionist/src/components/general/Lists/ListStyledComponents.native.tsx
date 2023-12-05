import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '../../general/Text/StyledText.native';

export const listStyles = StyleSheet.create({
  scrollableContent: {
    alignItems: 'center', 
    alignSelf: 'center',
  },
  scrollableList: {
    padding: 16
  },
  selectableButton: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
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

export const ListItemContainer = styled.View<ListItemStyleProps>`
  flex-direction: row;
  border-radius: 5px;
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
`;