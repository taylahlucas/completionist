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

export interface ContentMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const ContentMainDropdown = ({ category, completed, total }: ContentMainDropdownProps) => {
  const { selectedGame, selectedGameData } = useMainState();
  const { setSelectedCategory } = useContentDispatch();
  const { sectionType, selectedCategory } = useContentState();
  const { getContentSubCategories } = useGetContentCategories();
  const { getContentForSubCategory } = useGetContents();
  const subCategories = getContentSubCategories(category, selectedGame);
  const { checkContentCompleteForCategory } = useCheckContentComplete();
  const isEnabled: boolean = selectedGameData?.settingsConfig.find(settings => settings.category === category && settings.section === sectionType)?.isActive ?? false;

  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category,
        subCategory: ''
      })}
      enabled={isEnabled}
      header={
        <ListHeader title={category === 'None' ? 'Main' : category} enabled={isEnabled} completed={completed} total={total} />
      }
    >
      <SubListContainer>
        {subCategories.map((subCategory, index) => {
          const questsForCategory = getContentForSubCategory(category, subCategory);
          const completedQuests = checkContentCompleteForCategory(questsForCategory);
          
          return (
            <ContentSubDropdown
              key={index}
              mainCategory={category}
              subCategory={subCategory}
              completed={completedQuests.toString()}
              total={questsForCategory.length.toString()}
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