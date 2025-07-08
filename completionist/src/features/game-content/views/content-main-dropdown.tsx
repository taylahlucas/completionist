import React from 'react';
import { ListHeader, Dropdown, Condition } from '@components/general';
import { ContentListProps, ContentMainList, ContentSubDropdown } from './';
import { useContentState, useContentDispatch } from '../provider';
import { ContentItem } from '@utils/index';
import { useGetContent, useGetContentCategories } from './hooks';
import { isGameItemCompleteForCategory } from './helpers';

export interface ContentMainDropdownProps extends ContentListProps {
  category: ContentItem;
  completed: string;
  total: string;
}

export const ContentMainDropdown = ({
  category,
  completed,
  total,
  ...props
}: ContentMainDropdownProps) => {
  const { section, selectedGame } = props;
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentSubCategories, getContentSubCategoriesTypes } =
    useGetContentCategories(section);
  const { getContentForSubCategory } = useGetContent(section);
  const subCategories = getContentSubCategories(
    category.title,
    selectedGame?.id,
  );

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
        const completedQuests = isGameItemCompleteForCategory(
          section,
          questsForCategory,
          selectedGame,
        );
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
            {...props}
          />
        );
      })}
      <Condition condition={subCategories.length === 0}>
        <ContentMainList mainCategory={category} {...props} />
      </Condition>
    </Dropdown>
  );
};
