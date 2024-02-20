import React from 'react';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SelectFirstGameButtonContainer, SelectFirstGameButtonStyle } from './LoginFormStyledComponents.native';
import useActivateGameSubscription from '@utils/hooks/useActivateGameSubscription.native';
import useLoginDispatch from './hooks/useLoginDispatch';

interface SelectFirstGameButtonProps {
	selectedGame?: SubscriptionData;
	setSelectedGame: (game?: SubscriptionData) => void;
}

const SelectFirstGameButton = ({ selectedGame, setSelectedGame }: SelectFirstGameButtonProps) => {
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { setLoggedIn } = useLoginDispatch();
	const { activateGameSubscription } = useActivateGameSubscription();

	return (
		<SelectFirstGameButtonContainer style={{ backgroundColor: theme.black }}>
			<SelectFirstGameButtonStyle
				title={'Continue'}
				disabled={!selectedGame}
				onPress={async (): Promise<void> => {
					if (!!selectedGame) {
						activateGameSubscription(selectedGame);
						setSelectedGame(undefined);
						setLoggedIn(true);
						navigation.navigate(ScreenEnum.GameSelection);
					}
				}}
			/>
		</SelectFirstGameButtonContainer>
	);
};

export default SelectFirstGameButton;