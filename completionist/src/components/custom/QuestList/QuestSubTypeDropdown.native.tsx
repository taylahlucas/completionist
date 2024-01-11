import React from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestListItem from './QuestListItem.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import SubTypeListHeader from '@components/general/Lists/SubTypeListHeader.native';
import useQuestDispatch from './hooks/useQuestDispatch';
import useQuestState from './hooks/useQuestState';

export interface QuestSubTypeDropdownProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

const QuestSubTypeDropdown = ({ subCategory, type, completed, total }: QuestSubTypeDropdownProps) => {
  const { setSelectedCategory } = useQuestDispatch();
  const { selectedCategory } = useQuestState();
  const { getQuestsForSubCategoryWithType } = useGetQuests();
  const quests = getQuestsForSubCategoryWithType(subCategory, type === 'Main' ? '' : type);
  const { checkQuestComplete } = useCheckQuestComplete();

  return (
    <Condition condition={quests.length > 0}>
      <Dropdown
        isOpen={subCategory === selectedCategory.subCategory && type === selectedCategory.type}
        setOpen={() => setSelectedCategory({
          ...selectedCategory,
          type: type === selectedCategory.type ? '' : type
        })}
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

export default QuestSubTypeDropdown;