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
import { ContentItem, ContentSectionEnum, GameData } from '@utils/index';
import { isGameItemComplete, isGameItemCompleteForCategory } from './helpers';

export interface ContentListProps {
  section: ContentSectionEnum;
  selectedGame: GameData;
}

export const ContentList = ({ section, selectedGame }: ContentListProps) => {
  const { searchValue, webViewHref } = useContentState();
  const { setSearchValue, setWebViewHref } = useContentDispatch();
  const { getContentCategories } = useGetContentCategories(section);
  const { getContentForCategory, getFilteredContent } = useGetContent(section);
  const { updateContentComplete } = useUpdateContent(selectedGame);
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
      conditionalElement={
        <ScrollableList>
          {getFilteredContent().map((item, index) => (
            <ListItem
              key={index}
              id={item.id}
              title={item.title}
              isComplete={isGameItemComplete(section, item.id, selectedGame)}
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
            selectedGame,
          );

          return (
            <ContentMainDropdown
              key={index}
              category={category}
              completed={completedContent.toString()}
              total={allContentForCategory.length.toString()}
              section={section}
              selectedGame={selectedGame}
            />
          );
        })}
      </ScrollableList>
    </Condition>
  );
};
