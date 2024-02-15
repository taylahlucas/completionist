import React from 'react';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SelectFirstGameButtonContainer, SelectFirstGameButtonStyle } from './LoginFormStyledComponents.native';

interface SelectFirstGameButtonProps {
	selectedGame?: SubscriptionData;
	setSelectedGame: (game?: SubscriptionData) => void;
}

const SelectFirstGameButton = ({ selectedGame, setSelectedGame }: SelectFirstGameButtonProps) => {
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { updateUserInfo } = useEndpoints();
	const { saveUserAndLogin } = useEditUserData();

	return (
		<SelectFirstGameButtonContainer style={{ backgroundColor: theme.black }}>
			<SelectFirstGameButtonStyle
				title={'Continue'}
				disabled={!selectedGame}
				onPress={async (): Promise<void> => {
					const updatedGames: SubscriptionData[] = user.subscription.data.map(data => {
						return (data.id === selectedGame?.id)
							? {
								id: data.id,
								isActive: true
							} : data;
					});
					const updatedUser = {
						...user,
						subscription: {
							...user.subscription,
							data: updatedGames
						}
					};
					updateUserInfo(updatedUser);
					setSelectedGame(undefined);
					saveUserAndLogin(updatedUser);
					navigation.navigate(ScreenEnum.GameSelection);
				}}
			/>
		</SelectFirstGameButtonContainer>
	);
};

export default SelectFirstGameButton;