import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';

const useCheckSectionEnabled = () => {
  const { selectedGame, user } = useMainState();

  const checkIsSectionEnabled = (section: string) => {
    switch (selectedGame) {
      case GameKeyEnum.SKYRIM:
        return true;
        // return user.data.skyrim.settingsConfig.filter(config => config.section.title === section)[0]?.section.isActive ?? false
      case GameKeyEnum.FALLOUT_4:
        return true;
        // return user.data.fallout4.settingsConfig.filter(config => config.section.title === section)[0]?.section.isActive ?? false
      default:
        return false
    }
  };

  return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;