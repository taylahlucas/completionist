import React from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import ContentSubDropdown from './ContentSubDropdown.native';
import ContentMainList from './ContentMainList.native';
import useGetContents from './hooks/useGetContent';
import useMainState from '@redux/hooks/useMainState';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import useGetContentCategories from './hooks/useGetContentCategories';
import useContentState from './hooks/useContentState';
import useContentDispatch from './hooks/useContentDispatch';
import { SubListContainer } from '@components/general/Lists/ListStyledComponents.native';
import { CategoryType } from '@utils/CustomInterfaces';

export interface ContentMainDropdownProps {
  category: CategoryType;
  completed: string;
  total: string;
}

const ContentMainDropdown = ({ category, completed, total }: ContentMainDropdownProps) => {
  const { selectedGame, selectedGameData } = useMainState();
  const { setSelectedCategory } = useContentDispatch();
  const { sectionType, selectedCategory } = useContentState();
  const { getContentSubCategories } = useGetContentCategories();
  const { getContentForSubCategory, getMainTitle } = useGetContents();
  const subCategories = getContentSubCategories(category.title, selectedGame);
  const { checkContentCompleteForCategory } = useCheckContentComplete();
  const isEnabled: boolean = selectedGameData?.settingsConfig.find(settings => settings.category === category.id && settings.section === sectionType)?.isActive ?? false;

  return (
    <Dropdown
      isOpen={category.id === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: category.id === selectedCategory.category ? '' : category.id,
        subCategory: ''
      })}
      enabled={isEnabled}
      header={
        <ListHeader 
          title={getMainTitle(category.title)} 
          enabled={isEnabled} 
          completed={completed} 
          total={total} 
        />
      }
    >
      <SubListContainer>
        {subCategories.map((subCategory, index) => {
          // const questsForCategory = getContentForSubCategory(category.title, subCategory);
          // const completedQuests = checkContentCompleteForCategory(questsForCategory);
          
          return (
            <ContentSubDropdown
              key={index}
              mainCategory={category}
              subCategory={subCategory}
              // completed={completedQuests.toString()}
              // total={questsForCategory.length.toString()}
              completed={'0'}
              total={'0'}
            />
          )
        })}
        <Condition condition={subCategories.length === 0}>
          <ContentMainList mainCategory={category} />
        </Condition>
      </SubListContainer>
    </Dropdown>
  );
};

export default ContentMainDropdown;