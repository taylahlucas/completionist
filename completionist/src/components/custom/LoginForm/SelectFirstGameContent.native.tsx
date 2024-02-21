import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Spacing from '@components/general/Spacing.native';
import StyledText from '@components/general/Text/StyledText.native';
import GameListItem from '../GameList/GameListItem.native';
import useFilterGameList from '../GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';
import useFormatter from '@utils/hooks/useFormatter';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SelectFirstGameContentContainer } from './LoginFormStyledComponents.native';
import { useTranslation } from 'react-i18next';

interface SelectFirstGameContentProps {
	searchValue: string;
	selectedGame?: SubscriptionData;
	setSelectedGame: (game: SubscriptionData) => void;
}

const SelectFirstGameContent = ({ searchValue, selectedGame, setSelectedGame }: SelectFirstGameContentProps) => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	const { getFormattedSearchString } = useFormatter();

	return (
		<ScrollableList>
			<StyledText>{t('common:selectGame.selectGameDesc1')}</StyledText>
			<Spacing />
			<StyledText>{t('common:selectGame.selectGameDesc2')}</StyledText>
			<Spacing />
			<StyledText type='ListItemSubTitleItalic'>{t('common:selectGame.selectGameDesc3')}</StyledText>
			<SelectFirstGameContentContainer>
				{filterGameList(user.subscription.data, false, getFormattedSearchString(searchValue)).map((game, index) => (
					<GameListItem
						key={index}
						game={game}
						enabled={selectedGame?.id === game.id ?? false}
						enabledColor={selectedGame?.id === game.id ? theme.lightPurple : theme.midGrey}
						onPress={(): void => setSelectedGame(game)}
					/>
				))}
			</SelectFirstGameContentContainer>
		</ScrollableList>
	);
};

export default SelectFirstGameContent;