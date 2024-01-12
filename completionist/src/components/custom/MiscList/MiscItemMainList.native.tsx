import React from 'react';
import { ListContainer } from '@components/general/Lists/ListStyledComponents.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import ListItem from '@components/general/Lists/ListItem.native';

export interface MiscItemMainListProps {
  mainCategory: string;
  subCategory?: string;
  isSubCategory?: boolean;
}

const MiscItemMainList = ({ mainCategory, subCategory, isSubCategory = false }: MiscItemMainListProps) => {
  const { getMiscItemsForSubCategory, getMiscItemsForCategory, updateMiscItemsComplete } = useGetMiscItems();
  const miscItems = isSubCategory ? getMiscItemsForSubCategory(mainCategory, subCategory) : getMiscItemsForCategory(mainCategory);
  const { checkMiscItemComplete } = useCheckMiscItemComplete();
  
  return (
    <ListContainer>
      {miscItems?.map((item, index) => (
        <ListItem
          id={item.id}
          key={index}
          title={item.name}
          isComplete={checkMiscItemComplete(item.id)}
          action={(): void => updateMiscItemsComplete(item.id)}
        />
      ))}
    </ListContainer>
  );
};

export default MiscItemMainList;