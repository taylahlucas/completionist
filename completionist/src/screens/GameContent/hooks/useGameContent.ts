import { useGetUserGameData } from '@data/hooks/index';
import useMainState from '@redux/hooks/use-main-state';
import useContentState from '@components/custom/ContentList/provider/useContentState';
import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';

const useGameContent = () => {
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue, gameContent } = useContentState();
  const { userQuests, userCollectables, userLocations, userMiscItems } =
    useGetUserGameData();

  return {
    viewModel: {
      selectedGame,
      searchValue,
      quests: {
        completed: userQuests.length,
        total: gameContent?.quests.length,
      },
      collectables: {
        completed: userCollectables.length,
        total: gameContent?.collectables.length,
      },
      locations: {
        completed: userLocations.length,
        total: gameContent?.locations.length,
      },
      misc: {
        completed: userMiscItems.length,
        total: gameContent?.miscellaneous.length,
      },
    },
    actions: {
      setSearchValue,
    },
  };
};

export default useGameContent;
