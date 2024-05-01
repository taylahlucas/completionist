import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SelectFirstGameButtonContainer, SelectFirstGameButtonStyle } from './LoginFormStyledComponents.native';
import useActivateGameSubscription from '@utils/hooks/useActivateGameSubscription.native';
import useLoginDispatch from './hooks/useLoginDispatch';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface SelectFirstGameButtonProps {
	selectedGame?: SubscriptionData;
	setSelectedGame: (game?: SubscriptionData) => void;
}

const SelectFirstGameButton = ({ selectedGame, setSelectedGame }: SelectFirstGameButtonProps) => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { setLoggedIn } = useLoginDispatch();
	const { setShouldUpdateUser } = useMainDispatch();
	const { activateGameSubscription } = useActivateGameSubscription();
	const { updateUserData } = useEditUserData();

	return (
		<SelectFirstGameButtonContainer style={{ backgroundColor: theme.black }}>
			<SelectFirstGameButtonStyle
				title={t('common:continue')}
				disabled={!selectedGame}
				onPress={async (): Promise<void> => {
					if (!!selectedGame) {
						const updatedUser = activateGameSubscription(selectedGame);
						setShouldUpdateUser(true);
						setLoggedIn(true);
						updateUserData({
							...updatedUser,
							signup: {
								...updatedUser.signup,
								steps: {
									...updatedUser.signup.steps,
									selectGame: true
								}
							}
						});
						setSelectedGame(undefined);
						// TODO: Handle navigated through updateUser(user, isSignupFlow)
						navigation.navigate(ScreenEnum.GameSelection);
					}
				}}
			/>
		</SelectFirstGameButtonContainer>
	);
};

export default SelectFirstGameButton;