import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';

interface QuestListItemStyleProps {
  color: string;
}

export const QuestListItemContainer = styled.View<QuestListItemStyleProps>`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-top: 8px;
  padding: 8px;
  background-color: ${props => props.color};
`;

export const QuestListItemLocationContainer = styled.View`
  flex-direction: row;
`;

export const QuestListItemTitle = styled.Text<QuestListItemStyleProps>`
  font-size: 16px;
  padding-left: 16px;
  color: ${props => props.color};
`;

export const QuestListItemSubtitle = styled.Text`
  color: lightgrey;
  font-size: 12px;
`;

export const QuestListItemCheckBox = styled(CheckBox)`
  width: 30px;
  height: 30px;
`;