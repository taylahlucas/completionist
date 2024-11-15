import React from 'react';
import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useUpdateContent from '@components/custom/ContentList/hooks/useUpdateContent';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import useGetContent from './hooks/useGetContent';

const SearchResults = () => {
  const { getFilteredContent } = useGetContent();
  const { checkContentComplete } = useCheckContentComplete();
  const {  updateContentComplete } = useUpdateContent();
  
  return (
    <ScrollableList>
      {getFilteredContent().map((item, index) => (
        <ListItem
          key={index}
          id={item.id}
          title={item.title}
					href={item.href}
          isComplete={checkContentComplete(item.id)}
          action={((): void => updateContentComplete(item.id))}
        />
      ))}
    </ScrollableList>
  );
};

export default SearchResults;