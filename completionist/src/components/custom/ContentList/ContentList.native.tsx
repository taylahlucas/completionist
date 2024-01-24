import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useContentState from './hooks/useContentState';
import { ContentSection } from '@utils/CustomTypes';
import useGetContentCategories from './hooks/useGetContentCategories';
import useGetContent from './hooks/useGetContent';
import SearchResults from './SearchResults.native';
import ContentMainDropdown from './ContentMainDropdown.native';
import useCheckContentComplete from './hooks/useCheckContentComplete';

interface ContentListProps {
  type: ContentSection;
}

const ContentList = ({ type = 'Quests' }: ContentListProps) => {
  const { searchValue } = useContentState();
  const { getContentCategories } = useGetContentCategories(type);
  const { getAllContentForCategory } = useGetContent(type);
  const { checkContentCompleteForCategory } = useCheckContentComplete(type);

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <SearchResults type={type} />
      }
    >
      <ScrollableList>
        {getContentCategories().map((category: string, index: number) => {
          const allContentForCategory = getAllContentForCategory(category)
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