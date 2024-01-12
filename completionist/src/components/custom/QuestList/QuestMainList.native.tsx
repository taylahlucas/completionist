import React from 'react';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import ListItem from '@components/general/Lists/ListItem.native';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';

export interface QuestMainListProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestMainList = ({ category, isSubCategory = false }: QuestMainListProps) => {
  const { getQuestsForSubCategoryWithType, getQuestsForCategory, updateQuestItemsComplete } = useGetQuests();
  const quests = isSubCategory ? getQuestsForSubCategoryWithType(category) : getQuestsForCategory(category);
  const { checkQuestComplete } = useCheckQuestComplete();
  
  return (
    <ListContainer>
      {quests?.map((quest, index) => (
        <ListItem 
          key={index}
          id={quest.id}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
          isComplete={checkQuestComplete(quest.id)}
          action={(): void => updateQuestItemsComplete(quest.id)}
        />
      ))}
    </ListContainer>
  );
};

export default QuestMainList;