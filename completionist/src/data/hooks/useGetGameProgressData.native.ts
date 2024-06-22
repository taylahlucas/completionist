import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import useGetGameData from './useGetGameData';

const useGetGameProgressData = () => {
	const { user } = useMainState();
	const { mapDataTo } = useGetGameData();

	const getGameProgress = (games: GameKeyEnum[]) => {
		return games.map((game) => {
			const questData = mapDataTo(ContentSectionEnum.QUESTS, game, true);
			const collectablesData = mapDataTo(ContentSectionEnum.COLLECTABLES, game, true);
			const locationsData = mapDataTo(ContentSectionEnum.LOCATIONS, game, true);
			const miscellaneousData = mapDataTo(ContentSectionEnum.MISCELLANEOUS, game, true);

			let drawerItems = [];
			if (questData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.QUESTS,
					current: user.gameData[game].quests.filter((item: Item) => item.isComplete).length,
					total: questData.length
				})
			}
			if (collectablesData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.COLLECTABLES,
					current: user.gameData[game].collectables.filter((item: Item) => item.isComplete).length,
					total: collectablesData.length
				})
			}
			if (locationsData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.LOCATIONS,
					current: user.gameData[game].locations.filter((item: Item) => item.isComplete).length,
					total: locationsData.length
				})
			}
			if (miscellaneousData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.MISCELLANEOUS,
					current: user.gameData[game].miscellaneous.filter((item: Item) => item.isComplete).length,
					total: miscellaneousData.length
				})
			}

			return {
				id: game,
				data: drawerItems
			}
		})
	};

	return { getGameProgress };
};

export default useGetGameProgressData;