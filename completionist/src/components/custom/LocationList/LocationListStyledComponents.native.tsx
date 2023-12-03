import { Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';
import StyledText from '../../general/Text/StyledText.native';

interface LocationListItemStyleProps {
  color: string;
}

export const LocationListItemContainer = styled.View<LocationListItemStyleProps>`
  flex-direction: row;
  border-radius: 5px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${() => Dimensions.get('window').width - 50}px;
  background-color: ${props => props.color};
`;

export const LocationListItemCheckBox = styled(CheckBox)`
  width: 30px;
  height: 30px;
  margin-right: 16px;
`;
export const LocationListItemTitle = styled(StyledText)<LocationListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
`;