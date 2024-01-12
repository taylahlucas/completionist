import React from 'react';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import useGetQuests from './hooks/useGetQuests';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import ListItem from '@components/general/Lists/ListItem.native';

export interface QuestMainListProps {
  category: string;
  isSubCategory?: boolean;
}

const QuestMainList = ({ category, isSubCategory = false }: QuestMainListProps) => {
  const { getQuestsForSubCategoryWithType, getQuestsForCategory} = useGetQuests();
  const quests = isSubCategory ? getQuestsForSubCategoryWithType(category) : getQuestsForCategory(category);
  const { checkQuestComplete } = useCheckQuestComplete();
  const { updateQuestItemsComplete } = useGetQuests();
  
  return (
    <QuestListSubItemContainer>
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
    </QuestListSubItemContainer>
  );
};

export default QuestMainList;