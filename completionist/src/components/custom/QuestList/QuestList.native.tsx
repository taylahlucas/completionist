import React from 'react';
import QuestMainDropdown from './QuestMainDropdown.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useCheckSectionEnabled from '@navigation/hooks/useCheckSectionEnabled.native';
import useQuestState from './hooks/useQuestState';
import QuestSearchResults from './QuestSearchResults.native';

const QuestList = () => {
  const { selectedGame } = useMainState();
  const { searchValue } = useQuestState();
  const { getAllQuestsForCategory } = useGetQuests();
  const { getQuestCategories } = useGetQuestCategories();
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <QuestSearchResults />
      }
    >
      <ScrollableList>
        {getQuestCategories(selectedGame).map((category: string, index: number) => {
          const allQuestsForCategory = getAllQuestsForCategory(category);
          const completedQuests = checkQuestsCompleteForCategory(allQuestsForCategory);

          // TOOD: Check checkIsSectionEnabled
          return (
            <Condition key={index} condition={!checkIsSectionEnabled(category)}>
              <QuestMainDropdown
                key={index}
                category={category}
                completed={completedQuests.toString()}
                total={allQuestsForCategory.length.toString()}
              />
            </Condition>
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default QuestList;