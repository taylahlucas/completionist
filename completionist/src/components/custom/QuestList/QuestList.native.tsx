import React, { useEffect } from 'react';
import QuestMainDropdown from './QuestMainDropdown.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuestCategories from './hooks/useGetQuestCategories';
import useCheckSectionEnabled from '@navigation/hooks/useCheckSectionEnabled.native';

const QuestList = () => {
  const { triggerShowSearchResults } = useMainDispatch();
  const { searchValue, selectedGame } = useMainState();
  const { getQuestsForCategory, getAllQuestsForCategory } = useGetQuests();
  const { getQuestCategories } = useGetQuestCategories();
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  // TODO: Move to custom hook
  useEffect(() => {
    triggerShowSearchResults(searchValue.length >= 3);
  }, [searchValue])

  return (
    <ScrollableList>
      {getQuestCategories(selectedGame).map((category: string, index: number) => {
        const allQuestsForCategory = getAllQuestsForCategory(category);
        const completedQuests = checkQuestsCompleteForCategory(allQuestsForCategory);
        
        return (
          <Condition key={index} condition={getQuestsForCategory(category).length > 0 || !checkIsSectionEnabled(category)}>
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
  );
};

export default QuestList;