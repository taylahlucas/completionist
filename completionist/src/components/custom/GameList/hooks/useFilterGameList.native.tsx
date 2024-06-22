import { ActiveGameData } from '@utils/CustomInterfaces';

const useFilterGameList = () => {
	const filterGameList = (data: ActiveGameData[], isActive: boolean, searchValue: string) => {
		return data
      .filter(item => item.isActive === isActive)
      .filter(item => searchValue?.length > 0 ? (item.id as string).includes(searchValue) : true);
	};

	return { filterGameList };
};

export default useFilterGameList;