import React from 'react';
import QuestMainDropdown from './QuestMainDropdown.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useQuestState from './hooks/useQuestState';
import QuestSearchResults from './QuestSearchResults.native';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';

const QuestList = () => {
  const { searchValue } = useQuestState();
  const { getAllQuestsForCategory } = useGetQuests();
  const { getQuestCategories } = useGetQuestCategories();
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const {
    shouldShowCompletedItems,
    shouldShowDisabledSections
  } = useGetSettingsConfig();
  const questCategories = getQuestCategories();
  // console.log("EHRE:" , questCategories)
  // if (shouldShowDisabledSections()) {
  //   questCategories.filter(item => item.)
  // }
  // TODO: If show completed items
  // TODO: If hide disabled sections
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