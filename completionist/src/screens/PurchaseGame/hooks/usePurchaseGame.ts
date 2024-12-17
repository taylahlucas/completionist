import { GameKeyEnum } from '@utils/CustomEnums';
import { useGetGameData } from '@data/hooks/useGetGameData';
import { useTranslateGameContent } from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';

const usePurchaseGame = (gameId: GameKeyEnum) => {
  const { translateGameName } = useTranslateGameContent();
  const { selectedGame } = useMainState();
  const { getAllData } = useGetGameData(selectedGame);
  // TODO: get number of quests, collectables, locations and misc
  const { quests, collectables, locations, miscellaneous } = getAllData(gameId);

  return {
    viewModel: {
      questsLength: quests.data.length,
      collectablesLength: collectables.data.length,
      locationsLength: locations.data.length,
      miscLength: miscellaneous.data.length,
    },
    actions: {
      translateGameName,
    },
  };
};

export default usePurchaseGame;
