import { GameKeyEnum } from '@utils/CustomEnums';
import { GameData, GeneralData, IsActive } from '@utils/CustomInterfaces';

const useFilterGameList = () => {
	const filterGameList = (data: [string, GeneralData][], isActive: boolean, searchValue: string) => {
		return data
		// TODO: Need to fix
      // .filter(item => searchValue?.length > 0 ? (item. as string).includes(searchValue) : true);
	};

	return { filterGameList };
};

export default useFilterGameList;