import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';

interface QuestListItemStyleProps {
  color: string;
}

export const QuestListSubListContainer = styled.View`
  margin-top: 8px;
`;

export const QuestListSubItemContainer = styled.View`
  align-items: center;
  padding-bottom: 16px;
`;

export const QuestListItemContainer = styled.View<QuestListItemStyleProps>`
  flex-direction: row;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: ${() => Dimensions.get('window').width - 50}px;
  background-color: ${props => props.color};
`;

export const QuestListItemContentContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  justify-content: center;
  width: ${() => Dimensions.get('window').width - 96}px;
`;

export const QuestListItemLocationContainer = styled.View`
  flex-direction: row;
`;

export const QuestListItemTitle = styled(StyledText)<QuestListItemStyleProps>`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${props => props.color};
`;