import React from 'react';
import { ListItem, ScrollableList, listStyles } from '@components/general';
import { ContentItem } from '@utils/index';
import { EXTRA_LARGE_PADDING, DEFAULT_ITEM_HEIGHT } from '@styles/global';
import { useContentDispatch } from '../provider';
import { isGameItemComplete } from './helpers';
import { ContentListProps } from './content-list';
import { useGetContent, useUpdateContent } from './hooks';
import { useMainState } from '@redux/hooks';

export interface ContentMainListProps extends ContentListProps {
  mainCategory?: ContentItem;
  subCategory?: string;
  isSubCategory?: boolean;
}

export const ContentMainList = ({
  mainCategory,
  subCategory,
  isSubCategory = false,
  ...props
}: ContentMainListProps) => {
  const { section } = props;
  const { selectedGameData } = useMainState();
  const { setWebViewHref } = useContentDispatch();
  const { getContentForCategory, getContentForSubCategory } =
    useGetContent(section);
  const { updateContentComplete } = useUpdateContent(section, selectedGameData);
  const items = isSubCategory
    ? getContentForSubCategory(mainCategory?.title, subCategory)
    : getContentForCategory(mainCategory?.title ?? '');
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
          isComplete={isGameItemComplete(section, item.id, selectedGameData)}
          onLongPress={(): void => setWebViewHref(item.href)}
          action={(): void => updateContentComplete(item.id)}
        />
      ))}
    </ScrollableList>
  );
};
