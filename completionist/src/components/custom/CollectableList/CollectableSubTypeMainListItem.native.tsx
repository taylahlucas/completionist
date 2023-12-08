import React from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetCollectables from './hooks/useGetColletables.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import ListItem from '@components/general/Lists/ListItem.native';

export interface CollectableSubTypeMainListItemProps {
  mainType: string;
  subType?: string;
  isSubCategory?: boolean;
}

const CollectableSubTypeMainListItem = ({ mainType, subType, isSubCategory = false }: CollectableSubTypeMainListItemProps) => {
  const { setCompletedCollectableIds } = useMainDispatch();
  const { completedCollectableIds } = useMainState();
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
  const collectables = isSubCategory ? getCollectablesForSubCategory(mainType, subType) : getCollectablesForCategory(mainType);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
  return (
    <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <ListItem 
          id={collectable._id}
          key={index}
          name={collectable.name}
          isComplete={checkCollectableComplete(collectable._id)}
          action={(): void => {
            if (checkCollectableComplete(collectable._id)) {
              setCompletedCollectableIds(completedCollectableIds.filter(collectableId => collectableId !== collectable._id));
            }
            else {
              const updateCompletedCollectables = [...completedCollectableIds, collectable._id]
              setCompletedCollectableIds(updateCompletedCollectables);
            }
          }}
        />
      ))}
    </CollectableListSubItemContainer>
  );
};

export default CollectableSubTypeMainListItem;