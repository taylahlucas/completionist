import React from 'react';
import misc from '../../../../backend/database/skyrim_misc.json';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { MiscItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';
import MiscMainListItem from './MiscMainListItem.native';

const MiscList = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredMiscItems: MiscItem[] = misc.filter(misc => getFormattedSearchString(misc.name).includes(getFormattedSearchString(searchValue)));
  
  return (
    <ScrollableList>
      {filteredMiscItems.map((item: MiscItem, index: number) => (
        <MiscMainListItem
          key={index} 
          category={item.type}
          completed={'0'}
          total={'0'}
        />
      ))}
    </ScrollableList>
  );
};

export default MiscList;