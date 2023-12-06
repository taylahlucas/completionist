import React from 'react';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import { CollectableListItemContainer, CollectableListItemTitle } from './CollectableListStyledComponents.native'

interface CollectableListItemProps {
  id: string;
  name: string;
  isComplete?: boolean;
}

// TODO: Combine into one component
const CollectableListItem = ({ id, name, isComplete = false }: CollectableListItemProps) => {
  const theme = useGetTheme();
  const { setCompletedCollectableIds } = useMainDispatch();
  const { completedCollectableIds } = useMainState();

  const addOrRemoveCollectable= () => {
    if (isComplete) {
      setCompletedCollectableIds(completedCollectableIds.filter(collectableId => collectableId !== id));
    }
    else {
      const updateCompletedCollectables = [...completedCollectableIds, id]
      setCompletedCollectableIds(updateCompletedCollectables);
    }setCompletedCollectableIds
  };
  
  return (
    <CollectableListItemContainer color={isComplete ? theme.darkGrey : theme.midGrey}>
      <CollectableListItemTitle 
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={isComplete ? theme.midGrey : theme.lightestGrey}
      >
        {name}
      </CollectableListItemTitle>
      <CheckBox isToggled={isComplete} action={() => addOrRemoveCollectable()} />
    </CollectableListItemContainer>
  );
};

export default CollectableListItem;