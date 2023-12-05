import React from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import CollectableListItem from './CollectableListItem.native';
import useGetCollectables from './hooks/useGetColletables.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete.native';

export interface CollectableSubTypeMainListItemProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ mainType, subType, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainType, subType) : getCollectablesForCategory(mainType);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
  return (
    <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <CollectableListItem 
          id={collectable.id}
          key={index}
          name={collectable.name}
          isComplete={checkCollectableComplete(collectable.id)}
        />
      ))}
    </CollectableListSubItemContainer>
  );
};

export default CollectableSubTypeMainListItem;