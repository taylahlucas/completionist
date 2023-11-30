import React from 'react';
import { Text } from 'react-native';
import { getQuestsForCategory } from '../../../data/functions.native';

export interface QuestSubTypeMainListItemProps {
  category: string;
}

const QuestSubTypeMainListItem = ({ category }: QuestSubTypeMainListItemProps) => {
  const quests = getQuestsForCategory(category);
  
  return (
    <>
      {quests?.map((quest, index) => <Text key={index} style={{  padding: 8, marginLeft: 16 }}>{quest.title}</Text>)}
    </>
  );
};

export default QuestSubTypeMainListItem;