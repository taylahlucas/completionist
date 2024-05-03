import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import SelectFirstGameButton from '@components/custom/LoginForm/SelectFirstGameButton';
import useGetTheme from '@styles/hooks/useGetTheme';
import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useFormatter from '@utils/hooks/useFormatter';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import StyledText from '@components/general/Text/StyledText.native';
import Spacing from '@components/general/Spacing.native';
import { SelectFirstGameContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';

const SelectFirstGame = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	const { getFormattedSearchString } = useFormatter();
	const [searchValue, setSearchValue] = useState('');
	const [selectedGame, setSelectedGame] = useState<SubscriptionData>();

	// TODO: Update user here
	return (
		<StandardLayout>
			<NavigationHeader title={t('common:screens.selectGame')} leftAction='none' />
			<CustomSearchBar
				searchValue={searchValue}
				setSearchValue={(value: string): void => setSearchValue(value)}
				onReset={(): void => setSearchValue('')}
			/>
			<ScrollableList contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
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
			<SelectFirstGameButton
				selectedGame={selectedGame}
				setSelectedGame={setSelectedGame}
			/>
		</StandardLayout>
	);
};

export default SelectFirstGame;