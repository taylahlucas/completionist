import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useContentState from '@components/custom/ContentList/hooks/useContentState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import { ContentSectionEnum } from '@utils/CustomEnums';

const useGameContent = () => {
	const { selectedGame, selectedGameData } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue } = useContentState();
  const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData(selectedGameData);
  const { mapDataTo } = useGetGameData();

	return {
		viewModel: {
			selectedGame,
			searchValue,
			quests: {
				completed: getUserQuests().length,
				total: mapDataTo(ContentSectionEnum.QUESTS, selectedGame, true).length
			},
			collectables: {
				completed: getUserCollectables().length,
				total: mapDataTo(ContentSectionEnum.COLLECTABLES, selectedGame, true).length
			},
			locations: {
				completed: getUserLocations().length,
				total: mapDataTo(ContentSectionEnum.LOCATIONS, selectedGame, true).length
			},
			misc: {
				completed: getUserMiscItems().length,
				total: mapDataTo(ContentSectionEnum.MISCELLANEOUS, selectedGame, true).length
			}
		},
		actions: {
			setSearchValue,
			mapDataTo,
		}
	};
};

export default useGameContent;