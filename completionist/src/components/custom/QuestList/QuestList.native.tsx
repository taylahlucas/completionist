import React from 'react';
import { getQuestCategories } from '@data/functions';
import QuestMainListItem from './QuestMainListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useGetQuests from './hooks/useGetQuests.native';

const QuestList = () => {
  const questCategories = getQuestCategories();
  const { getQuestsForCategory } = useGetQuests();

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