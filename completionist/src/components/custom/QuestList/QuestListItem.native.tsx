import React from 'react';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import Condition from '@components/general/Condition.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetLocationString from './hooks/useGetLocationString.native';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemContentContainer } from './QuestListStyledComponents.native';

interface QuestListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  customStyle?: any;
  isComplete?: boolean;
}

const QuestListItem = ({ id, title, location, hold, customStyle, isComplete = false }: QuestListItemProps) => {
  const theme = useGetTheme();
  const { setcompletedQuests } = useMainDispatch();
  const { completedQuests } = useMainState();
  const locationString = useGetLocationString({ hold, location });
  
  const addOrRemoveQuest= () => {
    if (isComplete) {
      setcompletedQuests(completedQuests.filter(questId => questId !== id));
    }
    else {
      const updateCompletedQuests = [...completedQuests, id]
      setcompletedQuests(updateCompletedQuests);
    }
  };
  
  return (
    <QuestListItemContainer style={customStyle} color={isComplete ? theme.darkGrey : theme.midGrey}>
      <QuestListItemContentContainer>
        <QuestListItemTitle 
          align={'left'} 
          type={'ListItemSubTitle'} 
          color={isComplete ? theme.midGrey : theme.lightestGrey}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >{title}</QuestListItemTitle>
        <Condition condition={!!location || !!hold}>
          <QuestListItemLocationContainer>
            <StyledText 
              type={'ListItemSubDescription'} 
              color={isComplete ? theme.midGrey : theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </StyledText>
          </QuestListItemLocationContainer>
        </Condition>
      </QuestListItemContentContainer>
      <CheckBox isToggled={isComplete} action={() => addOrRemoveQuest()} />
    </QuestListItemContainer>
  );
};

export default QuestListItem;