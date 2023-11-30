import React from 'react';
import { Text } from 'react-native';
import { getQuestsForCategory, getQuestsForSubCategory } from '../../../data/functions.native';

export interface QuestSubTypeMainListItemProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestSubTypeMainListItem = ({ category, isSubCategory = false }: QuestSubTypeMainListItemProps) => {
  const quests = isSubCategory ? getQuestsForSubCategory(category) : getQuestsForCategory(category);
  console.log(quests)
  return (
    <>
      {quests?.map((quest, index) => <Text key={index} style={{  padding: 8, marginLeft: 16 }}>{quest.title}</Text>)}
    </>
  );
};

export default QuestSubTypeMainListItem;