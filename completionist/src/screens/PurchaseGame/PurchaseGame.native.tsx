import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import {KeyboardAvoidingScrollView} from '@components/general/Lists/index';
import Button from '@components/general/Button/Button.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import usePurchaseGame from './hooks/usePurchaseGame';
import { Spacing } from '@components/general/index';
import { allGameData } from '@utils/configs/gameConfigs';

const PurchaseGame = (params: any) => {
	const { t } = useTranslation();
	const gameId = params.route?.params.gameId;
	const { viewModel, actions } = usePurchaseGame(gameId);
	const selectedGame = allGameData.find((game) => game.id === gameId)

	if (!selectedGame) {
		console.log("Could not find selected game")
		return;
	}

	// TODO: Add translations
	return (
		<StandardLayout>
			<NavigationHeader
				id={AuthScreenEnum.PurchaseGame}
				title={t('common:screens.purchaseGame')}
				leftAction='back'
			/>
			<KeyboardAvoidingScrollView awareView={<Button title={t('common:continue')} onPress={(): void => console.log("Pay")} />}>
				<GameListItem 
					game={selectedGame}
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