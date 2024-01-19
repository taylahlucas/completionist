import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';

interface CollectableListItemStyleProps {
  color: string;
}

export const CollectableSubDropdownContainer = styled.View`
  margin-top: 8px;
`;

export const CollectableListItemContainer = styled.View<CollectableListItemStyleProps>`
  flex-direction: row;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: ${() => Dimensions.get('window').width - 50}px;
  background-color: ${props => props.color};
`;
 
export const CollectableListItemTitle = styled(StyledText)<CollectableListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
`;