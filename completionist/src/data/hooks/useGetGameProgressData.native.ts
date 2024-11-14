import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import useGetGameData from './useGetGameData';
import { getCurrentGame } from '@utils/hooks/useGetCurrentGameData.native';

const useGetGameProgressData = () => {
	const { user } = useMainState();
	const { mapDataTo } = useGetGameData();

	const getGameProgress = (games: GameKeyEnum[]) => {
		return games.map((game) => {
			const currentGame = getCurrentGame(game.id, user);
			const questData = mapDataTo(ContentSectionEnum.QUESTS, game, true);
			const collectablesData = mapDataTo(ContentSectionEnum.COLLECTABLES, game, true);
			const locationsData = mapDataTo(ContentSectionEnum.LOCATIONS, game, true);
			const miscellaneousData = mapDataTo(ContentSectionEnum.MISCELLANEOUS, game, true);

			let drawerItems = [];
			if (questData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.QUESTS,
					current: currentGame?.quests.filter((item: Item) => item.isComplete).length,
					total: questData.length
				})
			}
			if (collectablesData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.COLLECTABLES,
					current: currentGame?.collectables.filter((item: Item) => item.isComplete).length,
					total: collectablesData.length
				})
			}
			if (locationsData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.LOCATIONS,
					current: currentGame?.locations.filter((item: Item) => item.isComplete).length,
					total: locationsData.length
				})
			}
			if (miscellaneousData.length > 0) {
				drawerItems.push({
					id: ContentSectionEnum.MISCELLANEOUS,
					current: currentGame?.miscellaneous.filter((item: Item) => item.isComplete).length,
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