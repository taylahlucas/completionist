import React from 'react';
import ScrollableList from '../../general/Lists/ScrollableList.native';
import { getQuestCategories } from '../../../data/functions.native';
import QuestMainListItem from './QuestMainListItem.native';


const QuestList = () => {
  const questCategories = getQuestCategories();
  
  return (
    <ScrollableList>
      {questCategories.map((category: string) => (
        <QuestMainListItem category={category} />
      ))}
    </ScrollableList>
  );
};

export default QuestList;
