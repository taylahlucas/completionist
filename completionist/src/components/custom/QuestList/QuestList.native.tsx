import React, { useEffect } from 'react';
import { getQuestCategories } from '@data/functions';
import QuestMainListItem from './QuestMainListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests.native';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import useMainState from 'src/redux/hooks/useMainState.native';

const QuestList = () => {
  const questCategories = getQuestCategories();
  const { getQuestsForCategory } = useGetQuests();
  const { triggerShowSearchResults } = useMainDispatch();
  const { searchValue } = useMainState();

  useEffect(() => {
    triggerShowSearchResults(searchValue.length >= 3);
  }, [searchValue])

  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {questCategories.map((category: string, index: number) => (
        <Condition key={index} condition={getQuestsForCategory(category).length > 0}>
          <QuestMainListItem key={index} category={category} />
        </Condition>
      ))}
    </ScrollableList>
  );
};

export default QuestList;