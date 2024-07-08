import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import Button from '@components/general/Button/Button.native';

const PurchaseGame = (params: any) => {
	const gameId = params.route?.params.gameId;
	const test = 0;
	return (
		<StandardLayout>
			<NavigationHeader
				id={AuthScreenEnum.PurchaseGame}
				title={'Purchase Game'}
				leftAction='back'
			/>
			<KeyboardAvoidingScrollView awareView={<Button title='Continue' onPress={(): void => console.log("Pay")} />}>
				{/* // TODO: Add image of game */}
				<StyledText>{`Would you like to purchase data tracking for ${gameId}?\n\n`}</StyledText>
				<StyledText>{`This game has the following data available to track:\n`}</StyledText>
				<StyledText>{`Quests: ${test}?`}</StyledText>
				<StyledText>{`Collectables: ${test}?`}</StyledText>
				<StyledText>{`Locations: ${test}?`}</StyledText>
				<StyledText>{`Miscellaneous Items: ${test}?`}</StyledText>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default PurchaseGame;