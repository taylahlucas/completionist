import useMainState from '@redux/hooks/useMainState';

const useCheckSectionEnabled = () => {
	const { selectedGame } = useMainState();

	const checkIsSectionEnabled = (section: string): boolean => {
		return selectedGame?.settingsConfig.general
			.filter(config => config.section.id === section)[0]?.section.isActive ?? false;
	};

	return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;