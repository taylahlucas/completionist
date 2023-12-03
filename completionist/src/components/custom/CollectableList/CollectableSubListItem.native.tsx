import StyledText from '@components/general/Text/StyledText.native';
import React, { useState } from 'react';
import { getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
// import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import { CollectableListItemSubListHeader } from './CollectableListStyledComponents.native';
import CollectableSubTypeListItem from './CollectableSubTypeListItem.native';

export interface CollectableSubListItemProps {
  category: string;
}

const CollectableSubListItem = ({ category }: CollectableSubListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategoryTypes = getQuestSubCategoriesTypes(category);
  console.log("HERE: ", subCategoryTypes)
  
  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <CollectableListItemSubListHeader type={'ListItemSubTitleBold'} align={'left'}>{category}</CollectableListItemSubListHeader>
      }
    >
      <CollectableSubTypeListItem category={category} type={'Main'} />
      {subCategoryTypes?.map((type, index) => {
        return (
          <CollectableSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default CollectableSubListItem;