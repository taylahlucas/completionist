import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useGetTheme from '@styles/hooks/useGetTheme';
import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useFormatter from '@utils/hooks/useFormatter';
import StyledText from '@components/general/Text/StyledText.native';
import Spacing from '@components/general/Spacing.native';
import { SelectFirstGameContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import Button from '@components/general/Button/Button.native';
import useActivateGameSubscription from '@utils/hooks/useActivateGameSubscription.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import Condition from '@components/general/Condition.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useEditUserData from '@data/hooks/useEditUserData.native';

const SelectFirstGame = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	const { getFormattedSearchString } = useFormatter();
	const [searchValue, setSearchValue] = useState('');
	const [selectedGame, setSelectedGame] = useState<SubscriptionData>();
	const { activateGameSubscription } = useActivateGameSubscription();
	const { updateSignUpData } = useEditUserData();

	const renderAwareView = () => (
		<Button
			title={t('common:continue')}
			type='footer'
			disabled={!selectedGame}
			onPress={async (): Promise<void> => {
				if (!!selectedGame) {
					const updatedUser = {
						...user,
						signup: {
							...user.signup,
							selectGame: true
						}
					}
					updateSignUpData(updatedUser);
					activateGameSubscription(updatedUser, selectedGame);
				}
			}}
		/>
	);

	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.SelectFirstGame} title={t('common:screens.selectGame')} leftAction='none' />
			<CustomSearchBar
				searchValue={searchValue}
				setSearchValue={(value: string): void => setSearchValue(value)}
				onReset={(): void => setSearchValue('')}
			/>
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<Condition condition={searchValue.length === 0}>
					<StyledText>{t('common:selectGame.selectGameDesc1')}</StyledText>
					<Spacing />
					<StyledText>{t('common:selectGame.selectGameDesc2')}</StyledText>
					<Spacing />
					<StyledText type='ListItemSubTitleItalic'>{t('common:selectGame.selectGameDesc3')}</StyledText>
				</Condition>
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
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default SelectFirstGame;