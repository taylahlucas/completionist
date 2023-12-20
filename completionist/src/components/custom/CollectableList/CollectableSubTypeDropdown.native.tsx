import React, { useState } from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetCollectables from './hooks/useGetCollectables';
import useMainState from '@redux/hooks/useMainState';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';

export interface CollectableSubTypeDropdownProps {
  category: string;
  type: string;
}

const CollectableSubTypeDropdown = ({ category, type }: CollectableSubTypeDropdownProps) => {
  const theme = useGetTheme();
  const { showSearchResults} = useMainState();
  const { getCollectablesForSubCategory, updateCollectablesComplete } = useGetCollectables();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const collectables = getCollectablesForSubCategory(category, type === 'Main' ? '' : type);
  const { checkCollectableComplete } = useCheckCollectableComplete();

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
          action={((): void => updateCollectablesComplete(collectable.id))}
        />
      ))}
      </CollectableListSubItemContainer> 
    </Dropdown>
  );
};

export default CollectableSubTypeDropdown;