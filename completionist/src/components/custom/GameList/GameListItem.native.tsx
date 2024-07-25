import React from 'react';
import { GameListItemContainer, GameListImage, GameItemTitle, GameItemTitleContainer, GameItemScore } from './GameListItemStyledComponents.native';
import { ActiveGameData } from '@utils/CustomInterfaces';
import { useGameListItem } from './hooks/useGameListItem.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import Condition from '@components/general/Condition.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';

interface GameListItemProps {
	game: ActiveGameData;
	enabledColor?: string;
	enabled: boolean;
	onPress: () => void;
}

const GameListItem = ({ game, enabledColor = 'grey', enabled, onPress }: GameListItemProps) => {
	const { viewModel, actions } = useGameListItem();
	
	return (
		<GameListItemContainer
			testID={game.id}
			color={enabledColor}
			onPress={onPress}
		>
			<GameListImage 
				source={actions.getGameImage(game.id)} 
				style={{ opacity: enabled ? 0.6 : 0.2, borderRadius: DEFAULT_BORDER_RADIUS }} 
			/>
			<Condition condition={viewModel.currentScreen !== UnauthorizedScreenEnum.SelectFirstGame && !enabled}>
				<GameItemScore 
					type='ListItemTitleBold' 
					color={viewModel.theme.lightestGrey}
				>
					{actions.getPriceForGame(game.id)}
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
					{actions.translateGameName(game.id)}
				</GameItemTitle>
			</GameItemTitleContainer>
		</GameListItemContainer>
	);
};

export default GameListItem;