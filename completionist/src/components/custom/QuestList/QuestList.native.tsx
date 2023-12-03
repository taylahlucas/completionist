import React from 'react';
import { getQuestCategories } from '../../../data/functions.native';
import QuestMainListItem from './QuestMainListItem.native';
import ScrollableList from '../../general/Lists/ScrollableList.native';

const QuestList = () => {
  const questCategories = getQuestCategories();
  
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {questCategories.map((category: string, index: number) => (
        <QuestMainListItem key={index} category={category} />
      ))}
    </ScrollableList>
  );
};

export default QuestList;