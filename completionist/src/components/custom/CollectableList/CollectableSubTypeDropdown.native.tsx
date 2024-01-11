import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetCollectables from './hooks/useGetCollectables';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';
import useCollectableDispatch from './hooks/useCollectableDispatch';
import useCollectableState from './hooks/useCollectableState';

export interface CollectableSubTypeDropdownProps {
  category: string;
  type: string;
}

const CollectableSubTypeDropdown = ({ category, type }: CollectableSubTypeDropdownProps) => {
  const theme = useGetTheme();
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();
  const { getCollectablesForSubCategory, updateCollectablesComplete } = useGetCollectables();
  const collectables = getCollectablesForSubCategory(category, type === 'Main' ? '' : type);
  const { checkCollectableComplete } = useCheckCollectableComplete();

  return (
    <Dropdown
      isOpen={category === selectedCategory.category && type === selectedCategory.type}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        type: type === selectedCategory.subCategory ? '' : type
      })}
      header={
        <StyledText align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey} style={{ padding: 16, marginLeft: 32 }}>{type}</StyledText>
      }
    >
      <ListContainer>
        {collectables?.map((collectable, index) => (
          <ListItem
            key={index}
            id={collectable.id}
            name={collectable.name}
            isComplete={checkCollectableComplete(collectable.id)}
            action={((): void => updateCollectablesComplete(collectable.id))}
          />
        ))}
      </ListContainer>
    </Dropdown>
  );
};

export default CollectableSubTypeDropdown;