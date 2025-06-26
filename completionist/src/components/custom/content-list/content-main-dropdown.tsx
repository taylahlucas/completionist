import React from 'react';
import { ListHeader, Dropdown, Condition } from '@components/general';
import { ContentMainList, ContentSubDropdown } from './';
import { useMainState } from '@redux/hooks';
import {
  useCheckContentComplete,
  useGetContentCategories,
  useGetContent,
} from './hooks';
import { useContentState, useContentDispatch } from './provider';
import { ContentItem } from '@utils/index';

export interface ContentMainDropdownProps {
  category: ContentItem;
  completed: string;
  total: string;
}

export const ContentMainDropdown = ({
  category,
  completed,
  total,
}: ContentMainDropdownProps) => {
  const { selectedGame } = useMainState();
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentSubCategories, getContentSubCategoriesTypes } =
    useGetContentCategories();
  const { getContentForSubCategory } = useGetContent();
  const subCategories = getContentSubCategories(
    category.title,
    selectedGame?.id,
  );
  const { checkContentCompleteForCategory } = useCheckContentComplete();

  return (
    <Dropdown
      isOpen={category.id === selectedCategory.category}
      setOpen={(): void =>
        setSelectedCategory({
          ...selectedCategory,
          category:
            category.id === selectedCategory.category ? '' : category.id,
          subCategory: '',
        })
      }
      enabled={category.isActive}
      header={
        <ListHeader
          title={category.title}
          enabled={category.isActive}
          completed={completed}
          total={total}
        />
      }>
      {subCategories.map((subCategory, index) => {
        const questsForCategory = getContentForSubCategory(
          category.title,
          subCategory,
        );
        const completedQuests =
          checkContentCompleteForCategory(questsForCategory);
        const subCategoryTypes = getContentSubCategoriesTypes(
          subCategory,
          selectedGame?.id,
        );

        return (
          <ContentSubDropdown
            key={index}
            mainCategory={category}
            subCategory={subCategory}
            completed={completedQuests.toString()}
            total={(subCategoryTypes.length === 0
              ? questsForCategory
              : subCategoryTypes
            ).length.toString()}
          />
        );
      })}
      <Condition condition={subCategories.length === 0}>
        <ContentMainList mainCategory={category} />
      </Condition>
    </Dropdown>
  );
};
