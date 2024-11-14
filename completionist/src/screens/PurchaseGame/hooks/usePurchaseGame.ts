import useTranslateGameContent from '@data/hooks/useTranslateGameContent.native';

const usePurchaseGame = () => {
	const { translateGameName } = useTranslateGameContent();

	return {
		actions: {
			translateGameName
		}
	};
};

export default usePurchaseGame;