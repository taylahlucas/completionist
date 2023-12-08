import React from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import QuestListItem from './QuestListItem.native';
import useGetQuests from './hooks/useGetQuests.native';
import useCheckQuestComplete from '../QuestList/hooks/useCheckQuestComplete.native';

export interface QuestSubTypeMainListItemProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestSubTypeMainListItem = ({ category, isSubCategory = false }: QuestSubTypeMainListItemProps) => {
  const { getQuestsForSubCategoryWithType, getQuestsForCategory} = useGetQuests();
  const quests = isSubCategory ? getQuestsForSubCategoryWithType(category) : getQuestsForCategory(category);
  const { checkQuestComplete } = useCheckQuestComplete();
  
  return (
    <QuestListSubItemContainer>
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          id={quest._id}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
          isComplete={checkQuestComplete(quest._id)}
        />
      ))}
    </QuestListSubItemContainer>
  );
};

export default QuestSubTypeMainListItem;