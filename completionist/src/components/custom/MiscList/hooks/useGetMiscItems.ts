import { mappedMiscItems } from '@data/functions';
import { MiscItem } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

const useGetMiscItems = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredMiscItems = mappedMiscItems.filter(item => getFormattedSearchString(item.name).includes(getFormattedSearchString(searchValue)));

  const getMiscItemsForCategory = (category: string): MiscItem[] => {
    return filteredMiscItems.filter(item => item.type === category);
  };

  return {
    getMiscItemsForCategory
  }
};

export default useGetMiscItems;