import React from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetCollectables from './hooks/useGetCollectables';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import ListItem from '@components/general/Lists/ListItem.native';

export interface CollectableMainListProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableMainList = ({ mainType, subType, isSubCategory = false }: CollectableMainListProps) => {
  const { getCollectablesForSubCategory, getCollectablesForCategory, updateCollectablesComplete } = useGetCollectables();
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainType, subType) : getCollectablesForCategory(mainType);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
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

export default CollectableMainList;