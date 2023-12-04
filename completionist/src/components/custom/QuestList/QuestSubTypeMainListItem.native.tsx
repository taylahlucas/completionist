import React from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import QuestListItem from './QuestListItem.native';
import useGetQuests from './hooks/useGetQuests.native';

export interface QuestSubTypeMainListItemProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestSubTypeMainListItem = ({ category, isSubCategory = false }: QuestSubTypeMainListItemProps) => {
  const { getQuestsForSubCategory, getQuestsForCategory} = useGetQuests();
  const quests = isSubCategory ? getQuestsForSubCategory(category) : getQuestsForCategory(category);
  
  return (
    <QuestListSubItemContainer>
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
        />
      ))}
    </QuestListSubItemContainer>
  );
};

export default QuestSubTypeMainListItem;