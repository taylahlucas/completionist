import React, { useEffect } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import MiscMainDropdown from './MiscMainDropdown.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import Condition from '@components/general/Condition.native';
import useGetMiscItemCategories from './hooks/useGetMiscItemCategories';
import useMainState from '@redux/hooks/useMainState';
import useMiscState from './hooks/useMiscState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMiscDispatch from './hooks/useMiscDispatch';

const MiscList = () => {
  const { selectedGame } = useMainState();
  const { triggerShowSearchResults } = useMiscDispatch();
  const { searchValue } = useMiscState();
  const { getMiscItemCategories } = useGetMiscItemCategories();
  const { getMiscItemsForCategory } = useGetMiscItems();
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();

    // TODO: Move this to custom hook
    useEffect(() => {
      triggerShowSearchResults(searchValue.length >= 3);
    }, [searchValue])
  
  return (
    <ScrollableList style={{ overflow: 'scroll' }}>
      {getMiscItemCategories(selectedGame).map((category: string, index: number) => {
        const allMiscItemsForCategory = getMiscItemsForCategory(category);
        const completedMiscItems = checkMiscItemsCompleteForCategory(allMiscItemsForCategory);

        return (
          <Condition key={index} condition={allMiscItemsForCategory.length > 0}>
            <MiscMainDropdown
              key={index} 
              category={category}
              completed={completedMiscItems.toString()}
              total={allMiscItemsForCategory.length.toString()}
            />
          </Condition>
        )
      })}
    </ScrollableList>
  );
};

export default MiscList;