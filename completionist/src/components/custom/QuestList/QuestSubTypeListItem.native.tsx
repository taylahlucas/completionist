import React, { useState } from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestListItem from './QuestListItem.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import SubTypeListHeader from '@components/general/Lists/SubTypeListHeader.native';

export interface QuestListSubItemTypeProps {
  category: string;
  type: string;
  completed: string;
  total: string;
}

const QuestSubTypeListItem = ({ category, type, completed, total }: QuestListSubItemTypeProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategoryWithType } = useGetQuests();
  const quests = getQuestsForSubCategoryWithType(category, type === 'Main' ? '' : type);
  const { checkQuestComplete } = useCheckQuestComplete();
  
  return (
    <Condition condition={quests.length > 0}>
      <Dropdown
        isOpen={showSearchResults || isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        header={
          <SubTypeListHeader title={type} completed={completed} total={total} />
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