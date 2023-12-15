import React, { useState } from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubListItem from './QuestSubListItem.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import { QuestListSubListContainer } from './QuestListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useGetQuests from './hooks/useGetQuests';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';

export interface QuestMainListItemProps {
  category: string;
  completed: string;
  total: string;
}

const QuestMainListItem = ({ category, completed, total }: QuestMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategory } = useGetQuests();
  const { getQuestSubCategories } = useGetQuestCategories();
  const subCategories = getQuestSubCategories(category);
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();

  return (
    <Dropdown
      isOpen={showSearchResults || isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <QuestListSubListContainer>
        {subCategories.map((subCategory, index) => {
          const questsForCategory = getQuestsForSubCategory(subCategory);
          const completedQuests = checkQuestsCompleteForCategory(questsForCategory);

          return (
            <Condition key={index} condition={questsForCategory.length > 0}>
              <QuestSubListItem 
                key={index} 
                category={subCategory}
                completed={completedQuests.toString()}
                total={questsForCategory.length.toString()}
              />
            </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0}>
          <QuestSubTypeMainListItem category={category} />
        </Condition>
      </QuestListSubListContainer>
    </Dropdown>
  );
};

export default QuestMainListItem;