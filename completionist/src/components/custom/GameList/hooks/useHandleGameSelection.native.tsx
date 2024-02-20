import { Alert } from 'react-native';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useActivateGameSubscription from '@utils/hooks/useActivateGameSubscription.native';

const useHandleGameSelection = () => {
	const navigation = useReactNavigation();
	const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
	const { user } = useMainState();
	const { reset: contentReset } = useContentDispatch();
	const { translateGameName } = useTranslateGameContent();
	const { changeGameSubscription, activateGameSubscription } = useActivateGameSubscription();

	// TODO: Add to translations
	const handleGameSelection = (game: SubscriptionData) => {
		if (game.isActive) {
			contentReset();
			reset();
			setSelectedGame(game.id);
			setSelectedGameSettings(game.id);
			navigation.navigate(ScreenEnum.Quests);
		}
		else {
			const gameName: string = translateGameName(game.id);

			switch (user.subscription.tier) {
				case SubscriptionTypeEnum.FREE:
					if (user.subscription.changesLeft > 0) {
						const newChangesLeft = user.subscription.changesLeft - 1;
						Alert.alert(
							`Activate ${translateGameName(game.id)}?`,
							`You will have ${newChangesLeft} change${newChangesLeft === 1 ? '' : 's'} left.`,
							[
								{
									text: 'Activate',
									onPress: () => changeGameSubscription(game, newChangesLeft)
								},
								{
									text: 'Cancel',
									style: 'cancel'
								}
							]
						);
					}
					else {
						Alert.alert(
							'No changes left',
							'Sorry, you have no game changes left for this month.\n Please upgrade to a premium subscription, or wait until the 1st of next month.'
						);
					}
					break;
				case SubscriptionTypeEnum.PREMIUM:
					Alert.alert(
						`Activate ${gameName}?`,
						'',
						[
							{
								text: 'Activate',
								onPress: () => activateGameSubscription(game)
							},
							{
								text: 'Cancel',
								style: 'cancel'
							}
						]
					);
					break;
			}
		}
	};

	return { handleGameSelection };
};

export default useHandleGameSelection;