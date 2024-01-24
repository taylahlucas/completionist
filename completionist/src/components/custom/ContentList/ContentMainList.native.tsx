import React from 'react';
import useGetMiscItems from './hooks/useGetMiscItems.android';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete.android';
import ListItem from '@components/general/Lists/ListItem.native';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';

export interface ContentMainListProps {
  mainCategory: string;
  subCategory?: string;
  isSubCategory?: boolean;
}

const ContentMainList = ({ mainCategory, subCategory, isSubCategory = false }: ContentMainListProps) => {
  const { getMiscItemsForSubCategory, getMiscItemsForCategory, updateMiscItemsComplete } = useGetMiscItems();
  const miscItems = isSubCategory ? getMiscItemsForSubCategory(mainCategory, subCategory) : getMiscItemsForCategory(mainCategory);
  const { checkMiscItemComplete } = useCheckMiscItemComplete();

  return (
    <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
      {miscItems?.map((item, index) => (
        <ListItem
          id={item.id}
          key={index}
          title={item.title}
          isComplete={checkMiscItemComplete(item.id)}
          action={(): void => updateMiscItemsComplete(item.id)}
        />
      ))}
    </ListItemScrollView>
  );
};

export default ContentMainList;

