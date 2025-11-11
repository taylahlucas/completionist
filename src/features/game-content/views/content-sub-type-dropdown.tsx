import React from 'react';
import {
  Dropdown,
  ListItem,
  SubTypeListHeader,
  ScrollableList,
  listStyles,
} from '@components/general';
import { useContentState, useContentDispatch } from '../provider';
import { useGetContent, useUpdateContent } from './hooks';
import { ContentListProps } from './content-list';
import { isGameItemComplete } from './helpers';
import { useMainState } from '@redux/hooks';

export interface ContentSubTypeDropdownProps extends ContentListProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

export const ContentSubTypeDropdown = ({
  subCategory,
  type,
  completed,
  total,
  ...props
}: ContentSubTypeDropdownProps) => {
  const { section } = props;
  const { selectedGameData } = useMainState();
  const { setSelectedCategory, setWebViewHref } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContent(section);
  const { updateContentComplete } = useUpdateContent(section, selectedGameData);
  const items = getContentForSubCategoryType(subCategory, type);

  return (
    <Dropdown
      isOpen={
        subCategory === selectedCategory.subCategory &&
        type === selectedCategory.type
      }
      setOpen={() =>
        setSelectedCategory({
          ...selectedCategory,
          type: type === selectedCategory.type ? '' : type,
        })
      }
      header={
        <SubTypeListHeader title={type} completed={completed} total={total} />
      }>
      <ScrollableList contentContainerStyle={listStyles.listItemList}>
        {items?.map((item, index) => (
          <ListItem
            key={index}
            id={item.id}
            title={item.title}
            location={item.location}
            hold={item.hold}
            isComplete={isGameItemComplete(section, item.id, selectedGameData)}
            onLongPress={(): void => setWebViewHref(item.href)}
            action={(): void => updateContentComplete(item.id)}
          />
        ))}
      </ScrollableList>
    </Dropdown>
  );
};
