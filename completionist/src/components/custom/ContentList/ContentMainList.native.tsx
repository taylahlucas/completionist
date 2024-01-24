import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import { listStyles, ListItemScrollView } from '@components/general/Lists/ListStyledComponents.native';
import useGetContent from './hooks/useGetContent';
import useUpdateContent from './hooks/useUpdateContent';
import useCheckContentComplete from './hooks/useCheckContentComplete';

export interface ContentMainListProps {
  mainCategory?: string;
  subCategory?: string;
  isSubCategory?: boolean;
}

const ContentMainList = ({ mainCategory, subCategory, isSubCategory = false }: ContentMainListProps) => {
  const { getContentForCategory, getContentForSubCategory} = useGetContent();
  const { updateContentComplete } = useUpdateContent();
  const items = isSubCategory ? getContentForSubCategory(mainCategory, subCategory) : getContentForCategory(mainCategory ?? 'Main');
  const { checkContentComplete } = useCheckContentComplete();

  return (
    <ListItemScrollView contentContainerStyle={listStyles.listItemScrollableList}>
      {items?.map((item, index) => (
        <ListItem
          id={item.id}
          key={index}
          title={item.title}
          isComplete={checkContentComplete(item.id)}
          action={(): void => updateContentComplete(item.id)}
        />
      ))}
    </ListItemScrollView>
  );
};

export default ContentMainList;

