import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { getQuestsForSubCategory, getQuestSubCategories, getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestListHeader from './QuestListHeader.native';

export interface QuestListItemProps {
  category: string;
}

const QuestSubListItem = ({ category }: QuestListItemProps) => {
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
      {subCategoryTypes.map(type => {
        const mainQuests = getQuestsForSubCategory(category, '');
        const otherQuests = getQuestsForSubCategory(category, type);

        return (
          <>
            {mainQuests.map(quest => <Text style={{  padding: 8, marginLeft: 16 }}>{quest.title}</Text>)}
            <Text style={{ color: 'red', padding: 8, marginLeft: 8 }}>{type}</Text>
            {otherQuests.map(quest => <Text style={{  padding: 8, marginLeft: 16 }}>{quest.title}</Text>)}
          </>
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;
