import React from 'react';
import { ListItem, ScrollableList } from '@components/general';
import {
  useCheckContentComplete,
  useUpdateContent,
  useGetContent,
} from '../hooks';
import { useContentDispatch } from '../provider';

export const ContentSearchResults = () => {
  const { setWebViewHref } = useContentDispatch();
  const { getFilteredContent } = useGetContent();
  const { checkContentComplete } = useCheckContentComplete();
  const { updateContentComplete } = useUpdateContent();

  // TODO: Change here to display all data in sections
  return (
    <ScrollableList>
      {getFilteredContent().map((item, index) => (
        <ListItem
          key={index}
          id={item.id}
          title={item.title}
          isComplete={checkContentComplete(item.id)}
          onLongPress={(): void => setWebViewHref(item.href)}
          action={(): void => updateContentComplete(item.id)}
        />
      ))}
    </ScrollableList>
  );
};
