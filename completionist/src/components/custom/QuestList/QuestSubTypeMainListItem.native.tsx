import React from 'react';
import { getQuestsForCategory, getQuestsForSubCategory } from '../../../data/functions.native';
import QuestListItem from './QuestListItem.native';

export interface QuestSubTypeMainListItemProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestSubTypeMainListItem = ({ category, isSubCategory = false }: QuestSubTypeMainListItemProps) => {
  const quests = isSubCategory ? getQuestsForSubCategory(category) : getQuestsForCategory(category);
  
  return (
    <>
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
        />
      ))}
    </>
  );
};

export default QuestSubTypeMainListItem;