import React from 'react';
import { GameListItemContainer, GameListImage, GameItemTitle, GameItemTitleContainer, GameItemScore } from './GameListItemStyledComponents.native';
import { GameData } from '@utils/CustomInterfaces';
import { useGameListItem } from './hooks/useGameListItem.native';
import { GameKeyEnum, UnauthorizedScreenEnum } from '@utils/CustomEnums';
import Condition from '@components/general/Condition.native';

interface GameListItemProps {
	game: GameData;
	enabledColor?: string;
	enabled: boolean;
	onPress: () => void;
}

const GameListItem = ({ game, enabledColor = 'grey', enabled, onPress }: GameListItemProps) => {
	const { viewModel, actions } = useGameListItem();
	console.log("GAME LIST ITEM: ", game)
	const gameId = GameKeyEnum.SKYRIM;
	
	return (
		<GameListItemContainer
			testID={gameId}
			color={enabledColor}
			onPress={onPress}
		>
			<GameListImage 
				source={actions.getGameImage(gameId)} 
				style={{ opacity: enabled ? 0.6 : 0.2 }} 
			/>
			<Condition condition={viewModel.currentScreen !== UnauthorizedScreenEnum.SelectFirstGame && !enabled}>
				<GameItemScore 
					type='ListItemTitleBold' 
					color={viewModel.theme.lightestGrey}
				>
					{actions.getPriceForGame(gameId)}
				</GameItemScore>
			</Condition>
			<GameItemTitleContainer enabled={enabled}>
				<GameItemTitle
					type='SubHeading'
					color={viewModel.theme.lightestGrey}
					align='left'
					ellipsizeMode='tail'
					numberOfLines={2}
				>
					{actions.translateGameName(gameId)}
				</GameItemTitle>
			</GameItemTitleContainer>
		</GameListItemContainer>
	);
};

export default GameListItem;