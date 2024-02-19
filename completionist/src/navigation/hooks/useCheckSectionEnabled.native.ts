import useMainState from '@redux/hooks/useMainState';

const useCheckSectionEnabled = () => {
  const { selectedGameData } = useMainState();

  const checkIsSectionEnabled = (section: string): boolean => {
		// TODO: Check if this works
		return selectedGameData?.settingsConfig.general.filter(config => config.section.id === section)[0]?.section.isActive ?? false;
    // switch (selectedGame) {
		// 	case GameKeyEnum.FALLOUT_4:
    //     return selectedGameData?.settingsConfig.general.filter(config => config.section.id === section)[0]?.section.isActive;

    //   case GameKeyEnum.SKYRIM:
    //     return user.data.skyrim.settingsConfig.general.filter(config => config.section.id === section)[0]?.section.isActive;
    //   default:
    //     return false
    // }
  };

  return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;