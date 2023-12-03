import { Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';
import StyledText from '../../general/Text/StyledText.native';

interface CollectableListItemStyleProps {
  color: string;
}

export const CollectableListSubListContainer = styled.View`
  margin-top: 8px;
`;

export const CollectableListSubItemContainer = styled.View`
  align-items: center;
  padding-bottom: 16px;
`;

export const CollectableListItemSubListHeader = styled(StyledText)`
  padding: 8px;
  margin-left: 16px;
`;

export const CollectableListItemContainer = styled.View<CollectableListItemStyleProps>`
  flex-direction: row;
  border-radius: 5px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${() => Dimensions.get('window').width - 50}px;
  background-color: ${props => props.color};
`;

export const CollectableListItemCheckBox = styled(CheckBox)`
  width: 30px;
  height: 30px;
  margin-right: 16px;
`;
export const CollectableListItemTitle = styled(StyledText)<CollectableListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
`;