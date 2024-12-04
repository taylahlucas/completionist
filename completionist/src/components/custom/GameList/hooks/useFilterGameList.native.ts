import { GameData } from '@utils/CustomInterfaces';

const useFilterGameList = () => {
	const filterGameList = (data: GameData[], isActive: boolean, searchValue: string) => {
		return data
			// TODO: Need to fix with translations
      .filter(item => searchValue?.length > 0 ? (item.id as string).includes(searchValue) : true);
	};

	return { filterGameList };
};

export default useFilterGameList;