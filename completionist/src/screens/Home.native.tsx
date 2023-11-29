import React from 'react';
import ScrollableList from '../components/general/Lists/ScrollableList.native';
import quests from '../../backend/quests.json';
import QuestListItem, { QuestListItemProps } from '../components/custom/QuestList/QuestListItem.native';

const Home = () => {
  return (
    <ScrollableList>
      {quests.map((quest: QuestListItemProps) => (
        <QuestListItem 
          questCategory={quest.questCategory}
          questSubCategory={quest.questSubCategory}
          questSubCategoryType={quest.questSubCategoryType}
          questTitle={quest.questTitle}
          href={quest.href}
          isComplete={quest.isComplete}
        />
      ))}
    </ScrollableList>
  );
};

export default Home;