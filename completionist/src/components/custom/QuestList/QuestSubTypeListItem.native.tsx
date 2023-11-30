import React, { useState } from 'react';
import { Text } from 'react-native';
import { getQuestsForSubCategory } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';

export interface QuestListSubItemTypeProps {
  category: string;
  type: string;
}

const QuestSubTypeListItem = ({ category, type }: QuestListSubItemTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const quests = getQuestsForSubCategory(category, type === 'Main' ? '' : type)

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <Text style={{ color: 'red', padding: 8, marginLeft: 8 }}>{type}</Text>
      }
    >
      {quests?.map((quest, index) => <Text key={index} style={{  padding: 8, marginLeft: 16 }}>{quest.title}</Text>)}
    </Dropdown>
  );
};

export default QuestSubTypeListItem;