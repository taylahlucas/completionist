import React from 'react';
import { Dropdown } from '@components/general/Dropdown/index';
import useGetContents from './hooks/useGetContent';
import {
  ListItem,
  SubTypeListHeader,
  ScrollableList,
} from '@components/general/Lists/index';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { listStyles } from '@components/general/Lists/index';
import useContentDispatch from './provider/useContentDispatch';
import useContentState from './provider/useContentState';
import useUpdateContent from './hooks/useUpdateContent';

export interface ContentSubTypeDropdownProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

const ContentSubTypeDropdown = ({
  subCategory,
  type,
  completed,
  total,
}: ContentSubTypeDropdownProps) => {
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContents();
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
            href={item.href}
            isComplete={checkContentComplete(item.id)}
            action={(): void => updateContentComplete(item.id)}
          />
        ))}
      </ScrollableList>
    </Dropdown>
  );
};

export default ContentSubTypeDropdown;
