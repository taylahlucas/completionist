import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useUpdateContent from '@components/custom/ContentList/hooks/useUpdateContent';
import { ContentSection } from '@utils/CustomTypes';
import React from 'react';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import useGetContent from './hooks/useGetContent';

interface SearchResultsProps {
  type: ContentSection;
}

const SearchResults = ({ type }: SearchResultsProps) => {
  const { getFilteredContent } = useGetContent(type);
  const { checkContentComplete } = useCheckContentComplete(type);
  const {  updateContentComplete } = useUpdateContent(type);
  
  return (
    <ScrollableList>
      {getFilteredContent().map((item, index) => (
        <ListItem
          key={index}
          id={item.id}
          title={item.title}
          isComplete={checkContentComplete(item.id)}
          action={((): void => updateContentComplete(item.id))}
        />
      ))}
    </ScrollableList>
  );
};

export default SearchResults;