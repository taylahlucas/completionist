import ScrollableList from '@components/general/Lists/ScrollableList.native';
import React from 'react';
import useCheckQuestComplete from './hooks/useCheckQuestComplete';
import useGetQuests from './hooks/useGetQuests';
import QuestListItem from './QuestListItem.native';

const QuestSearchResults = () => {
  const { getFilteredQuests } = useGetQuests();
  const { checkQuestComplete } = useCheckQuestComplete();

  return (
    <ScrollableList>
      {getFilteredQuests().map((quest, index) => (
        <QuestListItem
          key={index}
          id={quest.id}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
          isComplete={checkQuestComplete(quest.id)}
        />
      ))}
    </ScrollableList>
  );
};

export default QuestSearchResults;