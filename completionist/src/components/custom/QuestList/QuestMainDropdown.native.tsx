import React, { useState } from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubDropdown from './QuestSubDropdown.native';
import QuestMainList from './QuestMainList.native';
import { QuestListSubListContainer } from './QuestListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useGetQuests from './hooks/useGetQuests';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';

export interface QuestMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const QuestMainDropdown = ({ category, completed, total }: QuestMainDropdownProps) => {
  const { showSearchResults, userSettings, selectedGame } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategory } = useGetQuests();
  const { getQuestSubCategories } = useGetQuestCategories();
  const subCategories = getQuestSubCategories(category, selectedGame);
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  
  return (
    <Dropdown
      isOpen={showSearchResults || isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      enabled={userSettings?.find(settings => settings.category === category)?.isActive ?? false}
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
              <QuestSubDropdown 
                key={index} 
                category={subCategory}
                completed={completedQuests.toString()}
                total={questsForCategory.length.toString()}
              />
            </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0}>
          <QuestMainList category={category} />
        </Condition>
      </QuestListSubListContainer>
    </Dropdown>
  );
};

export default QuestMainDropdown;