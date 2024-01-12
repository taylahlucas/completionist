import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuests from './hooks/useGetQuests';

const QuestSearchResults = () => {
  const { getFilteredQuests, updateQuestItemsComplete } = useGetQuests();
  const { checkQuestComplete } = useCheckQuestComplete();

  return (
    <ScrollableList>
      {getFilteredQuests().map((quest, index) => (
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
    </ScrollableList>
  );
};

export default QuestSearchResults;