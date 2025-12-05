import { useMainState } from '@redux/hooks';
import { ProgressItem, ContentSectionEnum } from '@utils/index';
import { useContentState } from '@features/game-content/provider';
import { filterActiveSections, getCurrentGame } from '@data/index';
import { useAuthUser } from '@redux/auth';
import { GameKey, IsActive } from '@api/';

export const useGetGameProgressData = () => {
  const { selectedGameData } = useMainState();
  const user = useAuthUser();
  const { gameContent } = useContentState();

  const getGameProgress = (games: GameKey[]): ProgressItem[] => {
    // TODO: Handle no user
    if (!user) return [];
    return games.map(game => {
      const currentGame = getCurrentGame(game, user);
      const questData = filterActiveSections(
        selectedGameData?.settingsConfig.general ?? [],
        gameContent?.quests ?? [],
      );
      const collectablesData = filterActiveSections(
        selectedGameData?.settingsConfig.general ?? [],
        gameContent?.collectables ?? [],
      );
      const locationsData = filterActiveSections(
        selectedGameData?.settingsConfig.general ?? [],
        gameContent?.locations ?? [],
      );
      const miscellaneousData = filterActiveSections(
        selectedGameData?.settingsConfig.general ?? [],
        gameContent?.miscellaneous ?? [],
      );

      const drawerItems = [];
      if (questData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.QUESTS,
          current:
            currentGame?.quests.filter((item: IsActive) => item.isActive)
              .length ?? 0,
          total: questData.length,
          data: currentGame?.quests,
        });
      }
      if (collectablesData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.COLLECTABLES,
          current:
            currentGame?.collectables.filter((item: IsActive) => item.isActive)
              .length ?? 0,
          total: collectablesData.length,
          data: currentGame?.collectables,
        });
      }
      if (locationsData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.LOCATIONS,
          current:
            currentGame?.locations.filter((item: IsActive) => item.isActive)
              .length ?? 0,
          total: locationsData.length,
          data: currentGame?.locations,
        });
      }
      if (miscellaneousData.length > 0) {
        drawerItems.push({
          id: ContentSectionEnum.MISCELLANEOUS,
          current:
            currentGame?.miscellaneous.filter((item: IsActive) => item.isActive)
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
