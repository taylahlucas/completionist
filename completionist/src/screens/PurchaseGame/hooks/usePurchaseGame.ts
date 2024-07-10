import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';

const usePurchaseGame = () => {
	const { translateGameName } = useTranslateGameContent();

	return {
		actions: {
			translateGameName
		}
	};
};

export default usePurchaseGame;