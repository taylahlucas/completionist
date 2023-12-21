import React from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import QuestListItem from './QuestListItem.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';

export interface QuestMainListProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestMainList = ({ category, isSubCategory = false }: QuestMainListProps) => {
  const { getQuestsForSubCategoryWithType, getQuestsForCategory} = useGetQuests();
  const quests = isSubCategory ? getQuestsForSubCategoryWithType(category) : getQuestsForCategory(category);
  const { checkQuestComplete } = useCheckQuestComplete();
  
  return (
    <QuestListSubItemContainer>
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          id={quest.id}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
          isComplete={checkQuestComplete(quest.id)}
        />
      ))}
    </QuestListSubItemContainer>
  );
};

export default QuestMainList;