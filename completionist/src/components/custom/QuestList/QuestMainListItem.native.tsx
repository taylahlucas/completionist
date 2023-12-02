import React, { useState } from 'react';
import { getQuestSubCategories } from '../../../data/functions.native';
import Condition from '../../general/Condition.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestListHeader from './QuestListHeader.native';
import QuestSubListItem from './QuestSubListItem.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import { QuestListSubListContainer } from './QuestListStyledComponents.native';

export interface QuestMainListItemProps {
  category: string;
}

const QuestMainListItem = ({ category }: QuestMainListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategories = getQuestSubCategories(category);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <QuestListHeader title={category} />
      }
    >
      <QuestListSubListContainer>
        {subCategories.map((subCategory, index) => 
          <QuestSubListItem key={index} category={subCategory} />
        )}
        <Condition condition={subCategories.length === 0}>
          <QuestSubTypeMainListItem category={category} />
        </Condition>
      </QuestListSubListContainer>
    </Dropdown>
  );
};

export default QuestMainListItem;