import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import Condition from '@components/general/Condition.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetLocationString from './hooks/useGetLocationString';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemContentContainer } from './QuestListStyledComponents.native';
import useGetQuests from './hooks/useGetQuests';

interface QuestListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  isComplete?: boolean;
}

const QuestListItem = ({ id, title, location, hold,  isComplete = false }: QuestListItemProps) => {
  const theme = useGetTheme();
  const locationString = useGetLocationString({ hold, location });
  const { updateQuestItemsComplete } = useGetQuests();
  
  return (
    <QuestListItemContainer color={isComplete ? theme.darkGrey : theme.midGrey}>
      <QuestListItemContentContainer>
        <QuestListItemTitle 
          align={'left'} 
          type={'ListItemSubTitle'} 
          color={isComplete ? theme.midGrey : theme.lightestGrey}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {title}
        </QuestListItemTitle>
        <Condition condition={!!location || !!hold}>
          <QuestListItemLocationContainer>
            <StyledText 
              type={'ListItemSubDescription'} 
              color={isComplete ? theme.midGrey : theme.lightGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </StyledText>
          </QuestListItemLocationContainer>
        </Condition>
      </QuestListItemContentContainer>
      <CheckBox isToggled={isComplete} action={() => updateQuestItemsComplete(id)} />
    </QuestListItemContainer>
  );
};

export default QuestListItem;