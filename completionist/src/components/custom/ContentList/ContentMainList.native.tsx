import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import { listStyles } from '@components/general/Lists/ListStyledComponents.native';
import useGetContent from './hooks/useGetContent';
import useUpdateContent from './hooks/useUpdateContent';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { SettingsListItem } from '@utils/CustomInterfaces';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

export interface ContentMainListProps {
  mainCategory?: SettingsListItem;
  subCategory?: string;
  isSubCategory?: boolean;
}

const ContentMainList = ({ mainCategory, subCategory, isSubCategory = false }: ContentMainListProps) => {
  const { getContentForCategory, getContentForSubCategory} = useGetContent();
  const { updateContentComplete } = useUpdateContent();
  const items = isSubCategory 
    ? getContentForSubCategory(mainCategory?.title, subCategory) 
    : getContentForCategory(mainCategory?.title ?? '');
  const { checkContentComplete } = useCheckContentComplete();

  return (
    <ScrollableList style={{ maxHeight: 300 }} contentContainerStyle={listStyles.listItemList}>
      {items?.map((item, index) => (
        <ListItem
          id={item.id}
          key={index}
          title={item.title}
          isComplete={checkContentComplete(item.id)}
          action={(): void => updateContentComplete(item.id)}
        />
      ))}
    </ScrollableList>
  );
};

export default ContentMainList;

