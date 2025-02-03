import React from 'react';
import { ListItem, ScrollableList } from '@components/general/Lists/index';
import useUpdateContent from '@components/custom/ContentList/hooks/useUpdateContent';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import useGetContent from './hooks/useGetContent';
import useContentDispatch from './provider/useContentDispatch';

const SearchResults = () => {
  const { setWebViewHref } = useContentDispatch();
  const { getFilteredContent } = useGetContent();
  const { checkContentComplete } = useCheckContentComplete();
  const { updateContentComplete } = useUpdateContent();

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

export default SearchResults;
