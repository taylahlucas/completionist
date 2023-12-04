import React from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import CollectableListItem from './CollectableListItem.native';
import useGetCollectables from './hooks/useGetColletables.native';

export interface CollectableSubTypeMainListItemProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ mainType, subType, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
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