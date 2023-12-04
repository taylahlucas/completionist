import { mappedCollectables } from '@data/functions';
import { Collectable } from '@utils/CustomTypes';
import useMainState from 'src/redux/hooks/useMainState.native';
import useSearchStringFormatter from '@utils/hooks/useSearchStringFormatter';

const useGetCollectables = () => {
  const { searchValue } = useMainState();
  const getFormattedSearchString = useSearchStringFormatter();
  const filteredCollectables = mappedCollectables.filter(collectable => getFormattedSearchString(collectable.name).includes(getFormattedSearchString(searchValue)));

  const getCollectablesForSubCategory = (type: string, subType: string = ''): Collectable[] => {
    if (subType.length === 0) {
      return filteredCollectables.filter(collectable => collectable.type === type);
    }
    else {
      return filteredCollectables.filter(collectable => collectable.type === type && collectable.subType === subType);
    }
  }

  const getCollectablesForCategory = (type: string): Collectable[] => {
    return filteredCollectables.filter(collectable => collectable.type === type);
  }

  return {
    getCollectablesForSubCategory,
    getCollectablesForCategory
  }
};

export default useGetCollectables;