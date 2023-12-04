import React from 'react';
import { getCollectablesForSubCategory, getCollectablesForCategory } from '@data/functions.native';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import CollectableListItem from './CollectableListItem.native';

export interface CollectableSubTypeMainListItemProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ mainType, subType, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainType, subType) : getCollectablesForCategory(mainType);
  
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