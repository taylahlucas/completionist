import { useMainState } from '@redux/hooks';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import { getCurrentGame } from '@data/hooks/index';

export const useGetGameProgress = () => {
  const { user } = useMainState();

  const getGameProgress = (id: GameKeyEnum, section: string): number => {
    const currentGame = getCurrentGame(id, user);
    switch (section) {
      case ContentSectionEnum.QUESTS:
        return currentGame?.quests.filter(item => item.isComplete).length ?? 0;
      case ContentSectionEnum.COLLECTABLES:
        return (
          currentGame?.collectables.filter(item => item.isComplete).length ?? 0
        );
      case ContentSectionEnum.LOCATIONS:
        return (
          currentGame?.locations.filter(item => item.isComplete).length ?? 0
        );
      case ContentSectionEnum.MISCELLANEOUS:
        return (
          currentGame?.miscellaneous.filter(item => item.isComplete).length ?? 0
        );
      default:
        return 0;
    }
  };

  return { getGameProgress };
};
