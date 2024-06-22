import { Alert } from 'react-native';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { AuthScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { ActiveGameData } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useActivateGameSubscription from '@utils/hooks/useActivateGameSubscription.native';
import { useTranslation } from 'react-i18next';

const useHandleGameSelection = () => {
	const navigation = useReactNavigation();
	const { t } = useTranslation();
	const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
	const { user } = useMainState();
	const { reset: contentReset } = useContentDispatch();
	const { translateGameName } = useTranslateGameContent();
	const { changeGameSubscription, activateGameSubscription } = useActivateGameSubscription();
	
	const handleGameSelection = (game: ActiveGameData) => {
		if (game.isActive) {
			contentReset();
			reset();
			setSelectedGame(game.id);
			setSelectedGameSettings(game.id);
			navigation.navigate(AuthScreenEnum.DrawerStack);
		}
		else {
			const gameName: string = translateGameName(game.id);

			// TODO: Refactor
			// switch (user.subscription.tier) {
			// 	case SubscriptionTypeEnum.FREE:
			// 		if (user.subscription.changesLeft > 0) {
			// 			const newChangesLeft = user.subscription.changesLeft - 1;
			// 			Alert.alert(
			// 				`${t('common:alerts.activate')} ${gameName}?`,
			// 				t('common:alerts.changesLeft',
			// 					{
			// 						changesLeft: newChangesLeft,
			// 						s: newChangesLeft === 1 ? 's' : ''
			// 					}
			// 				),
			// 				[
			// 					{
			// 						text: t('common:alerts.activate'),
			// 						onPress: () => changeGameSubscription(user, game, newChangesLeft)
			// 					},
			// 					{
			// 						text: t('common:alerts.cancel'),
			// 						style: 'cancel'
			// 					}
			// 				]
			// 			);
			// 		}
			// 		else {
			// 			Alert.alert(
			// 				t('common:alerts.noChangesLeft'),
			// 				t('common:alerts.noChangesLeftMessage')
			// 			);
			// 		}
			// 		break;
			// 	case SubscriptionTypeEnum.PREMIUM:
			// 		Alert.alert(
			// 			`${t('common:alerts.activate')} ${gameName}?`,
			// 			'',
			// 			[
			// 				{
			// 					text: t('common:alerts.activate'),
			// 					onPress: () => activateGameSubscription(user, game)
			// 				},
			// 				{
			// 					text: t('common:alerts.cancel'),
			// 					style: 'cancel'
			// 				}
			// 			]
			// 		);
			// 		break;
			// }
		}
	};

	return { handleGameSelection };
};

export default useHandleGameSelection;