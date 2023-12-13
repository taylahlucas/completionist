import React from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetCollectables from './hooks/useGetCollectables';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import ListItem from '@components/general/Lists/ListItem.native';
import useUpdateCollectablesComplete from './hooks/useUpdateCollectablesComplete';

export interface CollectableSubTypeMainListItemProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ mainType, subType, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainType, subType) : getCollectablesForCategory(mainType);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  const { updateCollectablesComplete } = useUpdateCollectablesComplete();
  
  return (
    <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <ListItem 
          id={collectable.id}
          key={index}
          name={collectable.name}
          isComplete={checkCollectableComplete(collectable.id)}
          action={(): void => updateCollectablesComplete(collectable.id)}
        />
      ))}
    </CollectableListSubItemContainer>
  );
};

export default CollectableSubTypeMainListItem;