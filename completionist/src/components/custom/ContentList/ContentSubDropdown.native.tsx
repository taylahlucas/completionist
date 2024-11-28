import React from 'react';
import {Dropdown} from '@components/general/Dropdown/index';
import ContentMainList from './ContentMainList.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useContentState from './provider/useContentState';
import useContentDispatch from './provider/useContentDispatch';
import useGetContentCategories from './hooks/useGetContentCategories';
import useMainState from '@redux/hooks/useMainState';
import {Condition} from '@components/general/index';
import ContentSubTypeDropdown from './ContentSubTypeDropdown.native';
import useGetContents from './hooks/useGetContent';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { ContentItem } from '@utils/CustomInterfaces';

export interface ContentSubDropdownProps {
  mainCategory: ContentItem;
  subCategory: string;
  completed: string;
  total: string;
}

const ContentSubDropdown = ({ mainCategory, subCategory, completed, total }: ContentSubDropdownProps) => {
  const { selectedGame } = useMainState();
  const { setSelectedCategory } = useContentDispatch();
  const { selectedCategory } = useContentState();
  const { getContentForSubCategoryType } = useGetContents();
  const { getContentSubCategoriesTypes } = useGetContentCategories();
  const { checkContentCompleteForCategory } = useCheckContentComplete();
  // TODO: Fix here
  const subCategoryTypes = getContentSubCategoriesTypes(subCategory, selectedGame?.id);

  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subCategory: subCategory === selectedCategory.subCategory ? '' : subCategory,
        type: ''
      })}
      header={
        <SubListHeader 
          title={subCategory} 
          completed={completed} 
          total={total} 
        />
      }
    >
			<Condition
				condition={subCategoryTypes?.length > 0}
				conditionalElement={
					<ContentMainList 
						mainCategory={mainCategory} 
						subCategory={subCategory} 
						isSubCategory
					/>
				}
			>
				{subCategoryTypes?.map((type, index) => {
					const contentForType = getContentForSubCategoryType(subCategory, type);
					const completedContent = checkContentCompleteForCategory(contentForType);

					return (
						<ContentSubTypeDropdown
							key={index}
							subCategory={subCategory} 
							type={type}
							completed={completedContent.toString()}
							total={contentForType.length.toString()}
						/>
					)
				})}
			</Condition>
    </Dropdown>
  );
};

export default ContentSubDropdown;