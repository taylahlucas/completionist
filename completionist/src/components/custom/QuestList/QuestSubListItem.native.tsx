import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import Condition from '@components/general/Condition.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import useMainState from '@redux/hooks/useMainState';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuests from './hooks/useGetQuests';
import useGetQuestCategories from './hooks/useGetQuestCategories';

export interface QuestSubListItemProps {
  category: string;
  completed: string;
  total: string;
}

const QuestSubListItem = ({ category, completed, total }: QuestSubListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getQuestsForSubCategoryWithType} = useGetQuests();
  const { getQuestSubCategoriesTypes } = useGetQuestCategories();
  const subCategoryTypes = getQuestSubCategoriesTypes(category);
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
          <QuestSubTypeListItem 
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
          <QuestSubTypeListItem 
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

export default QuestSubListItem;