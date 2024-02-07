import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useContentState from './hooks/useContentState';
import useGetContentCategories from './hooks/useGetContentCategories';
import useGetContent from './hooks/useGetContent';
import SearchResults from './SearchResults.native';
import ContentMainDropdown from './ContentMainDropdown.native';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { CategoryType } from '@utils/CustomInterfaces';

const ContentList = () => {
  const { searchValue } = useContentState();
  const { getContentCategories } = useGetContentCategories();
  const { getAllContentForCategory } = useGetContent();
  const { checkContentCompleteForCategory } = useCheckContentComplete();
  
  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <SearchResults />
      }
    >
      <ScrollableList>
        {getContentCategories().map((category: CategoryType, index: number) => {
          const allContentForCategory = getAllContentForCategory(category.title)
          const completedContent = checkContentCompleteForCategory(allContentForCategory)

          return (
            <ContentMainDropdown
              key={index}
              category={category}
              completed={completedContent.toString()}
              total={allContentForCategory.length.toString()}
            />
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default ContentList;