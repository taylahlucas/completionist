import React, { useState } from 'react';
import { Text } from 'react-native';
import { getQuestsForSubCategory } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestListItem from './QuestListItem.native';

export interface QuestListSubItemTypeProps {
  category: string;
  type: string;
}

const QuestSubTypeListItem = ({ category, type }: QuestListSubItemTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const quests = getQuestsForSubCategory(category, type)

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <Text style={{ color: 'red', padding: 8, marginLeft: 8 }}>{type}</Text>
      }
    >
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
        />
      ))}

    </Dropdown>
  );
};

export default QuestSubTypeListItem;