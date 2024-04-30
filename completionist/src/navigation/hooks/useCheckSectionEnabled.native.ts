import useMainState from '@redux/hooks/useMainState';

const useCheckSectionEnabled = () => {
	const { selectedGameData } = useMainState();

	const checkIsSectionEnabled = (section: string): boolean => {
		return selectedGameData?.settingsConfig.general
			.filter(config => config.section.id === section)[0]?.section.isActive ?? false;
	};

	return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;