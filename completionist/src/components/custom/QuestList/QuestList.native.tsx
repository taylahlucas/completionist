import React from 'react';
import QuestMainDropdown from './QuestMainDropdown.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useQuestState from './hooks/useQuestState';
import QuestSearchResults from './QuestSearchResults.native';

const QuestList = () => {
  const { searchValue } = useQuestState();
  const { getAllQuestsForCategory } = useGetQuests();
  const { getQuestCategories } = useGetQuestCategories();
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const questCategories = getQuestCategories();

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <QuestSearchResults />
      }
    >
      <ScrollableList>
        {questCategories.map((category: string, index: number) => {
          const allQuestsForCategory = getAllQuestsForCategory(category);
          const completedQuests = checkQuestsCompleteForCategory(allQuestsForCategory);

          return (
            <QuestMainDropdown
              key={index}
              category={category}
              completed={completedQuests.toString()}
              total={allQuestsForCategory.length.toString()}
            />
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default QuestList;