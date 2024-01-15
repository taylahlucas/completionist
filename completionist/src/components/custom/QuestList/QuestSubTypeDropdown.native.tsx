import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import SubTypeListHeader from '@components/general/Lists/SubTypeListHeader.native';
import useQuestDispatch from './hooks/useQuestDispatch';
import useQuestState from './hooks/useQuestState';
import ListItem from '@components/general/Lists/ListItem.native';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';

export interface QuestSubTypeDropdownProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

const QuestSubTypeDropdown = ({ subCategory, type, completed, total }: QuestSubTypeDropdownProps) => {
  const { setSelectedCategory } = useQuestDispatch();
  const { selectedCategory } = useQuestState();
  const { getQuestsForSubCategoryWithType, updateQuestItemsComplete } = useGetQuests();
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
        <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
          {quests?.map((quest, index) => (
            <ListItem
              key={index}
              id={quest.id}
              title={quest.title}
              location={quest.location}
              hold={quest.hold}
              isComplete={checkQuestComplete(quest.id)}
              action={(): void => updateQuestItemsComplete(quest.id)}
            />
          ))}
        </ListItemScrollView>
      </Dropdown>
    </Condition>
  );
};

export default QuestSubTypeDropdown;