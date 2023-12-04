import React, { useState } from 'react';
import { getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import { QuestListItemSubListHeader } from './QuestListStyledComponents.native';
import Condition from '@components/general/Condition.native';
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
        <QuestListItemSubListHeader type={'ListItemSubTitleBold'} align={'left'}>{category}</QuestListItemSubListHeader>
      }
    >
      <Condition 
        condition={subCategoryTypes.length > 0}
        conditionalElement={
          <QuestSubTypeMainListItem category={category} isSubCategory={true} />
        }  
      >
        <QuestSubTypeListItem category={category} type={'Main'} />
      </Condition>
      {subCategoryTypes?.map((type) => {
        return (
          <QuestSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;