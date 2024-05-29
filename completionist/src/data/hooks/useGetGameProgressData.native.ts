import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import useGetGameData from './useGetGameData';

const useGetGameProgressData = () => {
	const { user } = useMainState();
	const { mapDataTo } = useGetGameData();

	const getGameProgress = (games: GameKeyEnum[]) => {
		return games.map((game) => {
			return {
				id: game,
				data: [
					{
						id: ContentSectionEnum.QUESTS,
						current: user.data[game].quests.filter((item: Item) => item.isComplete).length,
						total: mapDataTo(ContentSectionEnum.QUESTS, game, true).length
					},
					{
						id: ContentSectionEnum.COLLECTABLES,
						current: user.data[game].collectables.filter((item: Item) => item.isComplete).length,
						total: mapDataTo(ContentSectionEnum.COLLECTABLES, game, true).length
					},
					{
						id: ContentSectionEnum.LOCATIONS,
						current: user.data[game].quests.filter((item: Item) => item.isComplete).length,
						total: mapDataTo(ContentSectionEnum.LOCATIONS, game, true).length
					},
					{
						id: ContentSectionEnum.MISCELLANEOUS,
						current: user.data[game].quests.filter((item: Item) => item.isComplete).length,
						total: mapDataTo(ContentSectionEnum.MISCELLANEOUS, game, true).length
					},
				]
			}
		})
	};

	return { getGameProgress };
};

export default useGetGameProgressData;