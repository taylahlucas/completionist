import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useGetCollectables from './hooks/useGetCollectables';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';
import useCollectableDispatch from './hooks/useCollectableDispatch';
import useCollectableState from './hooks/useCollectableState';
import SubTypeListHeader from '@components/general/Lists/SubTypeListHeader.native';

export interface CollectableSubTypeDropdownProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

const CollectableSubTypeDropdown = ({ subCategory, type, completed, total }: CollectableSubTypeDropdownProps) => {
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();
  const { getCollectablesForSubCategoryWithType, updateCollectablesComplete } = useGetCollectables();
  const collectables = getCollectablesForSubCategoryWithType(subCategory, type);
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory && type === selectedCategory.type}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        type: type === selectedCategory.type ? '' : type
      })}
      header={
        <SubTypeListHeader title={type} completed={completed} total={total} />
      }
    >
      <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
        {collectables?.map((collectable, index) => (
          <ListItem
            key={index}
            id={collectable.id}
            title={collectable.name}
            isComplete={checkCollectableComplete(collectable.id)}
            action={((): void => updateCollectablesComplete(collectable.id))}
          />
        ))}
      </ListItemScrollView>
    </Dropdown>
  );
};

export default CollectableSubTypeDropdown;