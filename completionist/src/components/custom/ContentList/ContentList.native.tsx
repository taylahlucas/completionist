import React from 'react';
import { View } from 'react-native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Condition from '@components/general/Condition.native';
import useContentState from './hooks/useContentState';
import useGetContentCategories from './hooks/useGetContentCategories';
import useGetContent from './hooks/useGetContent';
import SearchResults from './SearchResults.native';
import ContentMainDropdown from './ContentMainDropdown.native';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { SettingsListItem } from '@utils/CustomInterfaces';

const ContentList = () => {
  const { searchValue } = useContentState();
  const { getContentCategories } = useGetContentCategories();
  const { getContentForCategory } = useGetContent();
  const { checkContentCompleteForCategory } = useCheckContentComplete();
	const categories = getContentCategories();
	
	if (!categories) {
		return <View />;
	}
  return (
    <Condition
      condition={searchValue.length < 2 && !!categories}
      conditionalElement={<SearchResults />}
    >
      <ScrollableList>
        {categories.map((category: SettingsListItem, index: number) => {
          const allContentForCategory = getContentForCategory(category.title)
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