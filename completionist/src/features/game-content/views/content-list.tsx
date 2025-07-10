import React, { useEffect } from 'react';
import {
  ScrollableList,
  Condition,
  Loading,
  WikiWebView,
  ListItem,
} from '@components/general';
import { useContentState, useContentDispatch } from '../provider';
import { ContentMainDropdown } from './';
import {
  useGetContentCategories,
  useGetContent,
  useUpdateContent,
} from './hooks';
import { ContentItem, ContentSectionEnum } from '@utils/index';
import { isGameItemComplete, isGameItemCompleteForCategory } from './helpers';
import { useMainState } from '@redux/hooks';

export interface ContentListProps {
  section: ContentSectionEnum;
}

export const ContentList = ({ section }: ContentListProps) => {
  const { selectedGameData } = useMainState();
  const { searchValue, webViewHref } = useContentState();
  const { setSearchValue, setWebViewHref } = useContentDispatch();
  const { getContentCategories } = useGetContentCategories(section);
  const { getContentForCategory, getFilteredContent } = useGetContent(section);
  const categories = getContentCategories();

  if (!selectedGameData || !categories) {
    return <Loading />;
  }
  const { updateContentComplete } = useUpdateContent(section, selectedGameData);

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

  return (
    <Condition
      condition={searchValue.length < 2 && !!categories}
      conditionalElement={
        <ScrollableList>
          {getFilteredContent().map((item, index) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.title}
              isComplete={isGameItemComplete(
                section,
                item.id,
                selectedGameData,
              )}
              onLongPress={(): void => setWebViewHref(item.href)}
              action={(): void => updateContentComplete(item.id)}
            />
          ))}
        </ScrollableList>
      }>
      <ScrollableList>
        {categories.map((category: ContentItem, index: number) => {
          const allContentForCategory = getContentForCategory(category.title);
          const completedContent = isGameItemCompleteForCategory(
            section,
            allContentForCategory,
            selectedGameData,
          );

          return (
            <ContentMainDropdown
              key={index}
              category={category}
              completed={completedContent.toString()}
              total={allContentForCategory.length.toString()}
              section={section}
            />
          );
        })}
      </ScrollableList>
    </Condition>
  );
};
