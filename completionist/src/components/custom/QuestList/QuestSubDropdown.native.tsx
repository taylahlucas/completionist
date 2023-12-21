import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubTypeDropdown from './QuestSubTypeDropdown.native';
import Condition from '@components/general/Condition.native';
import QuestSubTypeMainListItem from './QuestMainList.native';
import useMainState from '@redux/hooks/useMainState';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuests from './hooks/useGetQuests';
import useGetQuestCategories from './hooks/useGetQuestCategories';

export interface QuestSubDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const QuestSubDropdown = ({ category, completed, total }: QuestSubDropdownProps) => {
  const { showSearchResults, selectedGame } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategoryWithType} = useGetQuests();
  const { getQuestSubCategoriesTypes } = useGetQuestCategories();
  const subCategoryTypes = getQuestSubCategoriesTypes(category, selectedGame);
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const mainQuests = getQuestsForSubCategoryWithType(category, '');
  
  return (
    <Dropdown
      isOpen={showSearchResults || isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <SubListHeader title={category} completed={completed} total={total} />
      }
    >
      <Condition 
        condition={subCategoryTypes?.length === 0}
        conditionalElement={
          <QuestSubTypeDropdown 
            category={category} 
            type={'Main'} 
            completed={checkQuestsCompleteForCategory(mainQuests).toString()} 
            total={mainQuests.length.toString()} 
          />
        }
      >
        <QuestSubTypeMainListItem category={category} isSubCategory={true} />
      </Condition>

      {subCategoryTypes?.map((type, index) => {
        const questsForType = getQuestsForSubCategoryWithType(category, type);
        const completedQuests = checkQuestsCompleteForCategory(questsForType);

        return (
          <QuestSubTypeDropdown 
            key={index} 
            category={category} 
            type={type}
            completed={completedQuests.toString()}
            total={questsForType.length.toString()}
          />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubDropdown;