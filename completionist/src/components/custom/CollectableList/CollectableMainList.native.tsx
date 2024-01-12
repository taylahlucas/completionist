import React from 'react';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';
import useGetCollectables from './hooks/useGetCollectables';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import ListItem from '@components/general/Lists/ListItem.native';

export interface CollectableMainListProps {
  mainCategory: string;
  subCategory?: string;
  isSubCategory?: boolean;
}

const CollectableMainList = ({ mainCategory, subCategory, isSubCategory = false }: CollectableMainListProps) => {
  const { getCollectablesForSubCategory, getCollectablesForCategory, updateCollectablesComplete } = useGetCollectables();
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainCategory, subCategory) : getCollectablesForCategory(mainCategory);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
  return (
    <ListContainer>
      {collectables?.map((collectable, index) => (
        <ListItem
          id={collectable.id}
          key={index}
          title={collectable.name}
          isComplete={checkCollectableComplete(collectable.id)}
          action={(): void => updateCollectablesComplete(collectable.id)}
        />
      ))}
    </ListContainer>
  );
};

export default CollectableMainList;