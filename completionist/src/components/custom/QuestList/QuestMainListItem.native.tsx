import React, { useState } from 'react';
import { getQuestSubCategories } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestListHeader from './QuestListHeader.native';
import QuestSubListItem from './QuestSubListItem.native';

export interface QuestListItemProps {
  category: string;
}

const QuestMainListItem = ({ category }: QuestListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategories = getQuestSubCategories(category);

  console.log("SUB CATEGORIES: ", subCategories)
  
  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <QuestListHeader title={category} />
      }
    >
      {subCategories.map(subCategory => 
        <QuestSubListItem category={subCategory} />
      )}
    </Dropdown>
  );
};

export default QuestMainListItem;