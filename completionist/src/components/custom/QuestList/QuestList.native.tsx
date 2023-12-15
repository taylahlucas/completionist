import React, { useEffect } from 'react';
import QuestMainListItem from './QuestMainListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';

const QuestList = () => {
  const { triggerShowSearchResults } = useMainDispatch();
  const { searchValue } = useMainState();
  const { getQuestsForCategory, getAllQuestsForCategory, getQuestCategories } = useGetQuests();
  const { checkQuestsCompleteForCategory } = useCheckQuestComplete();

  useEffect(() => {
    triggerShowSearchResults(searchValue.length >= 3);
  }, [searchValue])

  return (
    <ScrollableList>
      {getQuestCategories().map((category: string, index: number) => {
        const allQuestsForCategory = getAllQuestsForCategory(category);
        const completedQuests = checkQuestsCompleteForCategory(allQuestsForCategory);

        return (
          <Condition key={index} condition={getQuestsForCategory(category).length > 0}>
            <QuestMainListItem 
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