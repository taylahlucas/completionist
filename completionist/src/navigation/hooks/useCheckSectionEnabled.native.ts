import useMainState from '@redux/hooks/useMainState';

const useCheckSectionEnabled = () => {
	const { user, selectedGameSettings } = useMainState();

	const checkIsSectionEnabled = (section: string): boolean => {;
		const selectedGame = user.gameData?.find(item => item.id === selectedGameSettings);
		
		if (selectedGame) {
			return selectedGame.settingsConfig.general.filter(config => config.section.id === section)[0]?.section.isActive ?? false;
		}
		return false;
	};

	return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;