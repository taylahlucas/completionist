import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';

export const QuestListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-top: 8px;
  padding: 8px;
`;

export const QuestListItemLocationContainer = styled.View`
  flex-direction: row;
`;

export const QuestListItemTitle = styled.Text`
  font-size: 16px;
  padding-left: 16px;
`;

export const QuestListItemSubtitle = styled.Text`
  color: lightgrey;
  font-size: 12px;
`;

export const QuestListItemCheckBox = styled(CheckBox)`
  width: 30px;
  height: 30px;
`;