import React from 'react';
import { getCollectablesForSubCategory, getCollectablesForCategory } from '@data/functions.native';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import CollectableListItem from './QuestListItem.native';

export interface CollectableSubTypeMainListItemProps {
  type: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ type, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const collectables = isSubCategory ? getCollectablesForSubCategory(type) : getCollectablesForCategory(type);
  
  return (
    <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <CollectableListItem 
          key={index}
          name={collectable.name}
        />
      ))}
    </CollectableListSubItemContainer>
  );
};

export default CollectableSubTypeMainListItem;