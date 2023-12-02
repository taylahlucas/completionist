import React, { useState } from 'react';
import { getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import { QuestListItemSubListHeader } from './QuestListStyledComponents.native';

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
        <QuestListItemSubListHeader type={'ListItemSubTitleBold'} align={'left'}>{category}</QuestListItemSubListHeader>
      }
    >
      <QuestSubTypeListItem category={category} type={'Main'} />
      {subCategoryTypes?.map((type, index) => {
        return (
          <QuestSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;