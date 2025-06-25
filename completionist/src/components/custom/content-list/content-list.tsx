import React, { useEffect } from 'react';
import { ScrollableList } from '@components/general/Lists';
import { Condition, Loading } from '@components/general';
import { useContentState, useContentDispatch } from './provider';
import { ContentMainDropdown, ContentSearchResults } from './';
import {
  useCheckContentComplete,
  useGetContentCategories,
  useGetContent,
} from './hooks';
import { ContentItem } from '@utils/CustomInterfaces';
import WikiWebView from '@components/general/WikiWebView/WikiWebView.native';

const ContentList = () => {
  const { searchValue, webViewHref } = useContentState();
  const { setSearchValue, setWebViewHref } = useContentDispatch();
  const { getContentCategories } = useGetContentCategories();
  const { getContentForCategory } = useGetContent();
  const { checkContentCompleteForCategory } = useCheckContentComplete();
  const categories = getContentCategories();

  useEffect(() => {
    setSearchValue('');
    setWebViewHref(undefined);
  }, []);

  if (webViewHref) {
    return (
      <WikiWebView
        currentHref={webViewHref}
        setClose={() => setWebViewHref(undefined)}
      />
    );
  }
  if (!categories) {
    return <Loading />;
  }
  return (
    <Condition
      condition={searchValue.length < 2 && !!categories}
      conditionalElement={<ContentSearchResults />}>
      <ScrollableList>
        {categories.map((category: ContentItem, index: number) => {
          const allContentForCategory = getContentForCategory(category.title);
          const completedContent = checkContentCompleteForCategory(
            allContentForCategory,
          );

          return (
            <ContentMainDropdown
              key={index}
              category={category}
              completed={completedContent.toString()}
              total={allContentForCategory.length.toString()}
            />
          );
        })}
      </ScrollableList>
    </Condition>
  );
};

export default ContentList;
