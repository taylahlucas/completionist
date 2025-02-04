import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import { ProgressItem } from '@utils/CustomInterfaces';
import { useGetGameData, getCurrentGame } from '@data/hooks/index';

export const useGetGameProgressData = () => {
  const { user, selectedGame } = useMainState();
  const { mapDataTo } = useGetGameData(selectedGame);

  const getGameProgress = (games: GameKeyEnum[]): ProgressItem[] => {
    return games.map(game => {
      const currentGame = getCurrentGame(game, user);
      const questData = mapDataTo(ContentSectionEnum.QUESTS, game, true);
      const collectablesData = mapDataTo(
        ContentSectionEnum.COLLECTABLES,
        game,
        true,
      );
      const locationsData = mapDataTo(ContentSectionEnum.LOCATIONS, game, true);
      const miscellaneousData = mapDataTo(
        ContentSectionEnum.MISCELLANEOUS,
        game,
        true,
      );

      let drawerItems = [];
      if (questData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.QUESTS,
          current:
            currentGame?.quests.filter((item: Item) => item.isComplete)
              .length ?? 0,
          total: questData.length,
          data: currentGame?.quests,
        });
      }
      if (collectablesData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.COLLECTABLES,
          current:
            currentGame?.collectables.filter((item: Item) => item.isComplete)
              .length ?? 0,
          total: collectablesData.length,
          data: currentGame?.collectables,
        });
      }
      if (locationsData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.LOCATIONS,
          current:
            currentGame?.locations.filter((item: Item) => item.isComplete)
              .length ?? 0,
          total: locationsData.length,
          data: currentGame?.locations,
        });
      }
      if (miscellaneousData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.MISCELLANEOUS,
          current:
            currentGame?.miscellaneous.filter((item: Item) => item.isComplete)
              .length ?? 0,
          total: miscellaneousData.length,
          data: currentGame?.miscellaneous,
        });
      }

      return {
        id: game,
        data: drawerItems,
      };
    });
  };

  return { getGameProgress };
};
