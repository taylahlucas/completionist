import React, { useState } from 'react';
import { Text } from 'react-native';
import { getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';

export interface QuestSubListItemProps {
  category: string;
}

const QuestSubListItem = ({ category }: QuestSubListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategoryTypes = getQuestSubCategoriesTypes(category);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <Text style={{ color: 'blue', padding: 8 }}>{category}</Text>
      }
    >
      <QuestSubTypeMainListItem category={category} isSubCategory={true} />
      {subCategoryTypes?.map((type, index) => {
        return (
          <QuestSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;