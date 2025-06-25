import { useGetUserGameData } from '@data/hooks/index';
import { useMainState } from '@redux/hooks';
import {
  useContentState,
  useContentDispatch,
} from '@components/custom/content-list/provider';

export const useGameContent = () => {
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
