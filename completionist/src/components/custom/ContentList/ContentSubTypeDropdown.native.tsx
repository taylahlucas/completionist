import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useGetContents from './hooks/useGetContent';
import ListItem from '@components/general/Lists/ListItem.native';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { listStyles } from '@components/general/Lists/ListStyledComponents.native';
import useContentDispatch from './hooks/useContentDispatch';
import useContentState from './hooks/useContentState';
import SubTypeListHeader from '@components/general/Lists/SubTypeListHeader.native';
import useUpdateContent from './hooks/useUpdateContent';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

export interface ContentSubTypeDropdownProps {
  subCategory: string;
  type: string;
  completed: string;
  total: string;
}

const ContentSubTypeDropdown = ({ subCategory, type, completed, total }: ContentSubTypeDropdownProps) => {
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContents();
  const { updateContentComplete } = useUpdateContent();
  const items = getContentForSubCategoryType(subCategory, type);
  const { checkContentComplete } = useCheckContentComplete();
  
  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory && type === selectedCategory.type}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        type: type === selectedCategory.type ? '' : type
      })}
      header={
        <SubTypeListHeader title={type} completed={completed} total={total} />
      }
    >
      <ScrollableList style={{ maxHeight: 300 }} contentContainerStyle={listStyles.listItemList}>
        {items?.map((item, index) => (
          <ListItem
            key={index}
            id={item.id}
            title={item.title}
            location={item.location}
            hold={item.hold}
            isComplete={checkContentComplete(item.id)}
            action={((): void => updateContentComplete(item.id))}
          />
        ))}
      </ScrollableList>
    </Dropdown>
  );
};

export default ContentSubTypeDropdown;