import { GameKeyEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData';
import {useTranslateGameContent} from '@data/hooks/index';

const usePurchaseGame = (gameId: GameKeyEnum) => {
	const { translateGameName } = useTranslateGameContent();
	const { getAllData } = useGetGameData();
	// get number of quests, collectables, locations and misc
	const {
		quests,
		collectables,
		locations,
		miscellaneous
	} = getAllData(gameId);


	return {
		viewModel: {
			questsLength: quests.data.length,
			collectablesLength: collectables.data.length,
			locationsLength: locations.data.length,
			miscLength: miscellaneous.data.length
		},
		actions: {
			translateGameName,
		}
	};
};

export default usePurchaseGame;