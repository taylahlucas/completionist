import React from 'react';
import { Condition, SubListHeader, Dropdown } from '@components/general';
import { useContentDispatch, useContentState } from '../provider';
import { ContentSubTypeDropdown, ContentMainList, ContentListProps } from './';
import { ContentItem } from '@utils/index';
import { useGetContent, useGetContentCategories } from './hooks';
import { isGameItemCompleteForCategory } from './helpers';

export interface ContentSubDropdownProps extends ContentListProps {
  mainCategory: ContentItem;
  subCategory: string;
  completed: string;
  total: string;
}

export const ContentSubDropdown = ({
  mainCategory,
  subCategory,
  completed,
  total,
  ...props
}: ContentSubDropdownProps) => {
  const { section, selectedGame } = props;
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContent(section);
  const { getContentSubCategoriesTypes } = useGetContentCategories(section);

  // TODO: Fix here
  const subCategoryTypes = getContentSubCategoriesTypes(
    subCategory,
    selectedGame?.id,
  );

  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory}
      setOpen={() =>
        setSelectedCategory({
          ...selectedCategory,
          subCategory:
            subCategory === selectedCategory.subCategory ? '' : subCategory,
          type: '',
        })
      }
      header={
        <SubListHeader
          title={subCategory}
          completed={completed}
          total={total}
        />
      }>
      <Condition
        condition={subCategoryTypes?.length > 0}
        conditionalElement={
          <ContentMainList
            mainCategory={mainCategory}
            subCategory={subCategory}
            isSubCategory
            {...props}
          />
        }>
        {subCategoryTypes?.map((type, index) => {
          const contentForType = getContentForSubCategoryType(
            subCategory,
            type,
          );
          const completedContent = isGameItemCompleteForCategory(
            section,
            contentForType,
            selectedGame,
          );

          return (
            <ContentSubTypeDropdown
              key={index}
              subCategory={subCategory}
              type={type}
              completed={completedContent.toString()}
              total={contentForType.length.toString()}
              {...props}
            />
          );
        })}
      </Condition>
    </Dropdown>
  );
};
