import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import Button from '@components/general/Button/Button.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import usePurchaseGame from './hooks/usePurchaseGame';
import Spacing from '@components/general/Spacing.native';

const PurchaseGame = (params: any) => {
	const gameId = params.route?.params.gameId;
	const { viewModel, actions } = usePurchaseGame(gameId);

	// TODO: Add translations
	return (
		<StandardLayout>
			<NavigationHeader
				id={AuthScreenEnum.PurchaseGame}
				title={'Purchase Game'}
				leftAction='back'
			/>
			<KeyboardAvoidingScrollView awareView={<Button title='Continue' onPress={(): void => console.log("Pay")} />}>
				<GameListItem 
					game={{
						id: gameId,
						isActive: false
					}}
					enabled={true}
					onPress={(): void => {}}
				/>
				<Spacing />
				<StyledText>{`Would you like to purchase data tracking for ${actions.translateGameName(gameId)}?\n`}</StyledText>
				<StyledText>{`This game has the following data available to track:\n`}</StyledText>
				<StyledText align='left'>{`Quests: ${viewModel.questsLength}`}</StyledText>
				<StyledText>{`Collectables: ${viewModel.collectablesLength}`}</StyledText>
				<StyledText>{`Locations: ${viewModel.locationsLength}`}</StyledText>
				<StyledText>{`Miscellaneous Items: ${viewModel.miscLength}`}</StyledText>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default PurchaseGame;