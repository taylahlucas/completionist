import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import CollectableMainList from './CollectableMainList.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useCollectableState from './hooks/useContentState';
import useCollectableDispatch from './hooks/useContentDispatch';
import useGetCollectableCategories from './hooks/useGetContentCategories';
import useMainState from '@redux/hooks/useMainState';
import Condition from '@components/general/Condition.native';
import CollectableSubTypeDropdown from './ContentSubTypeDropdown.native';
import useGetCollectables from './hooks/useGetContent';
import useCheckCollectableComplete from './hooks/useCheckContentComplete';

export interface ContentSubDropdownProps {
  mainCategory?: string;
  subCategory: string;
  completed: string;
  total: string;
}

const ContentSubDropdown = ({ mainCategory, subCategory, completed, total }: ContentSubDropdownProps) => {
  const { selectedGame } = useMainState();
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();
  const { getCollectablesForSubCategoryWithType } = useGetCollectables();
  const { getCollectableSubCategoriesTypes } = useGetCollectableCategories();
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();
  const subCategoryTypes = getCollectableSubCategoriesTypes(subCategory, selectedGame);

  return (
    <Dropdown
      isOpen={subCategory === selectedCategory.subCategory}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subCategory: subCategory === selectedCategory.subCategory ? '' : subCategory
      })}
      header={
        <SubListHeader title={subCategory} completed={completed} total={total} />
      }
    >
      <Condition
        condition={subCategoryTypes?.length > 0}
        conditionalElement={
          <CollectableMainList mainCategory={mainCategory} subCategory={subCategory} isSubCategory={true} />
        }
      >
        {subCategoryTypes?.map((type, index) => {
          const collectablesForType = getCollectablesForSubCategoryWithType(subCategory, type);
          const completedCollectables = checkCollectablesCompleteForCategory(collectablesForType);

          return (
            <CollectableSubTypeDropdown
              key={index}
              subCategory={subCategory}
              type={type}
              completed={completedCollectables.toString()}
              total={collectablesForType.length.toString()}
            />
          )
        })}
      </Condition>
    </Dropdown>
  );
};

export default ContentSubDropdown;