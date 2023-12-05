import React, { useState } from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import StyledText from '../../general/Text/StyledText.native';
import QuestListItem from './QuestListItem.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import useCheckQuestComplete from './hooks/useCheckQuestComplete.native';

export interface QuestListSubItemTypeProps {
  category: string;
  type: string;
}

const QuestSubTypeListItem = ({ category, type }: QuestListSubItemTypeProps) => {
  const theme = useGetTheme();
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategory } = useGetQuests();
  const quests = getQuestsForSubCategory(category, type === 'Main' ? '' : type);
  const { checkQuestComplete } = useCheckQuestComplete();
  
  return (
    <Condition condition={quests.length > 0}>
      <Dropdown
        isOpen={showSearchResults || isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        header={
          <StyledText align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey} style={{ padding: 16, marginLeft: 32 }}>{type}</StyledText>
        }
      >
      <QuestListSubItemContainer>
        {quests?.map((quest, index) => (
          <QuestListItem 
            key={index}
            id={quest.id}
            title={quest.title}
            location={quest.location}
            hold={quest.hold}
            isComplete={checkQuestComplete(quest.id)}
          />
        ))}
        </QuestListSubItemContainer> 
      </Dropdown>
    </Condition>
  );
};

export default QuestSubTypeListItem;