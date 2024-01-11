import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubTypeDropdown from './QuestSubTypeDropdown.native';
import Condition from '@components/general/Condition.native';
import QuestSubTypeMainListItem from './QuestMainList.native';
import useMainState from '@redux/hooks/useMainState';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuests from './hooks/useGetQuests';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useQuestDispatch from './hooks/useQuestDispatch';
import useQuestState from './hooks/useQuestState';

export interface QuestSubDropdownProps {
  subCategory: string;
  completed: string;
  total: string;
}

const QuestSubDropdown = ({ subCategory, completed, total }: QuestSubDropdownProps) => {
  const { selectedGame } = useMainState();
  const { setSelectedCategory } = useQuestDispatch();
  const { selectedCategory } = useQuestState();
  const { getQuestsForSubCategoryWithType } = useGetQuests();
  const { getQuestSubCategoriesTypes } = useGetQuestCategories();
  const subCategoryTypes = getQuestSubCategoriesTypes(subCategory, selectedGame);
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const mainQuests = getQuestsForSubCategoryWithType(subCategory, '');

  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subCategory: subCategory === selectedCategory.subCategory ? '' : subCategory
      })}
      header={
        <SubListHeader title={subCategory} completed={completed} total={total} />
      }
    >
      <Condition
        condition={subCategoryTypes?.length === 0}
        conditionalElement={
          <QuestSubTypeDropdown
            subCategory={subCategory}
            type={'Main'}
            completed={checkQuestsCompleteForCategory(mainQuests).toString()}
            total={mainQuests.length.toString()}
          />
        }
      >
        <QuestSubTypeMainListItem category={subCategory} isSubCategory={true} />
      </Condition>
      {subCategoryTypes?.map((type, index) => {
        const questsForType = getQuestsForSubCategoryWithType(subCategory, type);
        const completedQuests = checkQuestsCompleteForCategory(questsForType);

        return (
          <QuestSubTypeDropdown
            key={index}
            subCategory={subCategory}
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