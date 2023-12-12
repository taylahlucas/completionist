import React, { useState } from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetCollectables from './hooks/useGetCollectables';
import useMainState from '@redux/hooks/useMainState';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useMainDispatch from '@redux/hooks/useMainDispatch';

export interface CollectableSubTypeListItemProps {
  category: string;
  type: string;
}

const CollectableSubTypeListItem = ({ category, type }: CollectableSubTypeListItemProps) => {
  const theme = useGetTheme();
  const { setCompletedCollectableIds } = useMainDispatch();
  const { completedCollectableIds, showSearchResults} = useMainState();
  const { getCollectablesForSubCategory } = useGetCollectables();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const collectables = getCollectablesForSubCategory(category, type === 'Main' ? '' : type);
  const { checkCollectableComplete } = useCheckCollectableComplete()

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <StyledText align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey} style={{ padding: 16, marginLeft: 32 }}>{type}</StyledText>
      }
    >
     <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <ListItem 
          key={index}
          id={collectable.id}
          name={collectable.name}
          isComplete={checkCollectableComplete(collectable.id)}
          action={((): void => {
            if (checkCollectableComplete(collectable.id)) {
              setCompletedCollectableIds(completedCollectableIds.filter(collectableId => collectableId !== collectable.id));
            }
            else {
              const updateCompletedCollectables = [...completedCollectableIds, collectable.id]
              setCompletedCollectableIds(updateCompletedCollectables);
            }
          })}
        />
      ))}
      </CollectableListSubItemContainer> 
    </Dropdown>
  );
};

export default CollectableSubTypeListItem;