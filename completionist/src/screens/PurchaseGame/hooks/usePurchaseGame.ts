import {useTranslateGameContent} from '@data/hooks/index';

const usePurchaseGame = () => {
	const { translateGameName } = useTranslateGameContent();

	return {
		actions: {
			translateGameName
		}
	};
};

export default usePurchaseGame;