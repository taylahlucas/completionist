import React, { useState } from 'react';
import { getCollectablesForSubCategory, } from '../../../data/functions.native';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import StyledText from '../../general/Text/StyledText.native';
import CollectableListItem from './QuestListItem.native';

export interface CollectableSubTypeListItemProps {
  category: string;
  type: string;
}

const CollectableSubTypeListItem = ({ category, type }: CollectableSubTypeListItemProps) => {
  const theme = useGetTheme();
  const [isOpen, setIsOpen] = useState(false);
  const collectables = getCollectablesForSubCategory(category, type === 'Main' ? '' : type);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <StyledText align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey} style={{ padding: 16, marginLeft: 32 }}>{type}</StyledText>
      }
    >
     <CollectableListSubItemContainer>
      {collectables?.map((collectable, index) => (
        <CollectableListItem 
          key={index}
          name={collectable.name}
        />
      ))}
      </CollectableListSubItemContainer> 
    </Dropdown>
  );
};

export default CollectableSubTypeListItem;