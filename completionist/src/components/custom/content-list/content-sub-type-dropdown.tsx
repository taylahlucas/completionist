import React from 'react';
import { Dropdown } from '@components/general/Dropdown';
import {
  ListItem,
  SubTypeListHeader,
  ScrollableList,
  listStyles,
} from '@components/general/Lists';
import { useContentState, useContentDispatch } from './provider';
import {
  useCheckContentComplete,
  useUpdateContent,
  useGetContent,
} from './hooks';

export interface ContentSubTypeDropdownProps {
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
}: ContentSubTypeDropdownProps) => {
  const { setSelectedCategory, setWebViewHref } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContent();
  const { updateContentComplete } = useUpdateContent();
  const items = getContentForSubCategoryType(subCategory, type);
  const { checkContentComplete } = useCheckContentComplete();

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
            isComplete={checkContentComplete(item.id)}
            onLongPress={(): void => setWebViewHref(item.href)}
            action={(): void => updateContentComplete(item.id)}
          />
        ))}
      </ScrollableList>
    </Dropdown>
  );
};
