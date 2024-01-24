import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import CollectableMainDropdown from './CollectableMainDropdown.native';
import useGetCollectables from './hooks/useGetContent';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useGetCollectableCategories from './hooks/useGetContentCategories';
import useCollectableState from './hooks/useCollectableState';
import CollectableSearchResults from './CollectableSearchResults.native';
import useContentState from './hooks/useContentState';
import { ContentSection } from '@utils/CustomTypes';
import useGetContentCategories from './hooks/useGetContentCategories';
import useGetContent from './hooks/useGetContent';

interface ContentListProps {
  type: ContentSection;
}

const ContentList = ({ type = 'Quests' }: ContentListProps) => {
  const { searchValue } = useContentState();
  const { getContentCategories } = useGetContentCategories(type);

  const { getAllCollectablesForCategory } = useGetContent(type);
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <CollectableSearchResults />
      }
    >
      <ScrollableList>
        {getContentCategories().map((category: string, index: number) => {
          const allCollectablesForCategory = getAllCollectablesForCategory(category)
          const completedCollectables = checkCollectablesCompleteForCategory(allCollectablesForCategory)

          return (
            <CollectableMainDropdown
              key={index}
              category={category}
              completed={completedCollectables.toString()}
              total={allCollectablesForCategory.length.toString()}
            />
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default ContentList;