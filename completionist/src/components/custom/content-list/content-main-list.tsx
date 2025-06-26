import React from 'react';
import { ListItem, ScrollableList, listStyles } from '@components/general';
import {
  useCheckContentComplete,
  useUpdateContent,
  useGetContent,
} from './hooks';
import { ContentItem } from '@utils/index';
import { EXTRA_LARGE_PADDING, DEFAULT_ITEM_HEIGHT } from '@styles/global';
import { useContentDispatch } from './provider';

export interface ContentMainListProps {
  mainCategory?: ContentItem;
  subCategory?: string;
  isSubCategory?: boolean;
}

export const ContentMainList = ({
  mainCategory,
  subCategory,
  isSubCategory = false,
}: ContentMainListProps) => {
  const { setWebViewHref } = useContentDispatch();
  const { getContentForCategory, getContentForSubCategory } = useGetContent();
  const { updateContentComplete } = useUpdateContent();
  const items = isSubCategory
    ? getContentForSubCategory(mainCategory?.title, subCategory)
    : getContentForCategory(mainCategory?.title ?? '');
  const { checkContentComplete } = useCheckContentComplete();
  const scrollHeight =
    DEFAULT_ITEM_HEIGHT * items?.length + EXTRA_LARGE_PADDING;
  const maxHeight = 300;

  return (
    <ScrollableList
      style={{ maxHeight: scrollHeight > maxHeight ? maxHeight : scrollHeight }}
      contentContainerStyle={listStyles.listItemList}>
      {items?.map((item, index) => (
        <ListItem
          id={item.id}
          key={index}
          title={item.title}
          isComplete={checkContentComplete(item.id)}
          onLongPress={(): void => setWebViewHref(item.href)}
          action={(): void => updateContentComplete(item.id)}
        />
      ))}
    </ScrollableList>
  );
};
