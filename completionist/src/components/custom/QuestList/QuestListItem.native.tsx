import React from 'react';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import Condition from '@components/general/Condition.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetLocationString from './hooks/useGetLocationString.native';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemContentContainer } from './QuestListStyledComponents.native';
import useUpdateCollectablesComplete from '../CollectableList/hooks/useUpdateCollectablesComplete';
import useUpdateQuestItemsComplete from './hooks/useUpdateQuestItemsComplete';

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
  const locationString = useGetLocationString({ hold, location });
  const { updateQuestItemsComplete } = useUpdateQuestItemsComplete();
  
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
      <CheckBox isToggled={isComplete} action={() => updateQuestItemsComplete(id)} />
    </QuestListItemContainer>
  );
};

export default QuestListItem;