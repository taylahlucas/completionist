import React from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import QuestSubDropdown from './QuestSubDropdown.native';
import QuestMainList from './QuestMainList.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useGetQuests from './hooks/useGetQuests';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useQuestState from './hooks/useQuestState';
import useQuestDispatch from './hooks/useQuestDispatch';
import { SubListContainer } from '@components/general/Lists/ListStyledComponents.native';

export interface QuestMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const QuestMainDropdown = ({ category, completed, total }: QuestMainDropdownProps) => {
  const { userSettings, selectedGame } = useMainState();
  const { setSelectedCategory } = useQuestDispatch();
  const { selectedCategory } = useQuestState();
  const { getQuestsForSubCategory } = useGetQuests();
  const { getQuestSubCategories } = useGetQuestCategories();
  const subCategories = getQuestSubCategories(category, selectedGame);
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const isEnabled: boolean = userSettings?.find(settings => settings.category === category && settings.section === "Quests")?.isActive ?? false;

  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category
      })}
      enabled={isEnabled}
      header={
        <ListHeader title={category} enabled={isEnabled} completed={completed} total={total} />
      }
    >
      <SubListContainer>
        {subCategories.map((subCategory, index) => {
          const questsForCategory = getQuestsForSubCategory(subCategory);
          const completedQuests = checkQuestsCompleteForCategory(questsForCategory);

          return (
            <Condition key={index} condition={questsForCategory.length > 0}>
              <QuestSubDropdown 
                key={index} 
                subCategory={subCategory}
                completed={completedQuests.toString()}
                total={questsForCategory.length.toString()}
              />
            </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0}>
          <QuestMainList category={category} />
        </Condition>
      </SubListContainer>
    </Dropdown>
  );
};

export default QuestMainDropdown;