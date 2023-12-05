import React, { useEffect, useState } from 'react';
import { CollectableListSubItemContainer } from './CollectableListStyledComponents.native';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import StyledText from '../../general/Text/StyledText.native';
import CollectableListItem from './CollectableListItem.native';
import useGetCollectables from './hooks/useGetColletables.native';
import useMainState from 'src/redux/hooks/useMainState.native';

export interface CollectableSubTypeListItemProps {
  category: string;
  type: string;
}

const CollectableSubTypeListItem = ({ category, type }: CollectableSubTypeListItemProps) => {
  const theme = useGetTheme();
  const { searchValue, showSearchResults} = useMainState();
  const { getCollectablesForSubCategory } = useGetCollectables();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const collectables = getCollectablesForSubCategory(category, type === 'Main' ? '' : type);

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