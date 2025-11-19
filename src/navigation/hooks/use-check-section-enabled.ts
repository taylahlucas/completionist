import { useAuthUser } from '@redux/auth';
import { useMainState } from '@redux/hooks';

export const useCheckSectionEnabled = () => {
  const { selectedGameSettings } = useMainState();
  const user = useAuthUser();

  const checkIsSectionEnabled = (section: string): boolean => {
    const selectedGame = user.gameData?.find(
      item => item.id === selectedGameSettings,
    );

    if (selectedGame) {
      return (
        selectedGame.settingsConfig.general.filter(
          config => config.section.id === section,
        )[0]?.section.isActive ?? false
      );
    }
    return false;
  };

  return { checkIsSectionEnabled };
};
