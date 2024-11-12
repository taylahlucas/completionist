import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { useTranslation } from 'react-i18next';
import StyledText from '@components/general/Text/StyledText.native';
import Spacing from '@components/general/Spacing.native';
import { SelectFirstGameContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import Button from '@components/general/Button/Button.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import Condition from '@components/general/Condition.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import ParagraphView from '@components/general/ParagraphView.native';
import useSignupFlow from './hooks/useSignupFlow';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';

const SelectFirstGame = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { isGoogleSignIn } = useLoginState();
	const { setIsGoogleSignIn } = useLoginDispatch();
	const { viewModel, actions } = useSignupFlow();
	const { translateGameName } = useTranslateGameContent();
	
	const renderAwareView = () => (
		<Button
			title={t('common:continue')}
			type='footer'
			disabled={!viewModel.selectedFirstGame}
			onPress={async (): Promise<void> => {
				if (!!viewModel.selectedFirstGame) {
					const updatedUser = {
						...viewModel.user,
						signup: {
							...viewModel.user.signup,
							selectGame: true
						}
					}
					actions.activateGame(updatedUser, viewModel.selectedFirstGame);
					setIsGoogleSignIn(false);
				}
			}}
		/>
	);

	return (
		<StandardLayout isLoading={viewModel.isLoading}>
			<NavigationHeader 
				id={UnauthorizedScreenEnum.SelectFirstGame} 
				title={t('common:screens.selectGame')} 
				leftAction={isGoogleSignIn ? 'back' : 'none'}
			/>
			<CustomSearchBar
				searchValue={viewModel.searchValue}
				setSearchValue={(value: string): void => actions.setSearchValue(value)}
				onReset={(): void => actions.setSearchValue('')}
			/>
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<Condition condition={viewModel.searchValue.length === 0}>
					<ParagraphView>
						<StyledText>{t('common:selectGame.selectGameDesc1')}</StyledText>
						<Spacing />
						<StyledText>{t('common:selectGame.selectGameDesc2')}</StyledText>
						<Spacing />
						<StyledText type='ListItemSubTitleItalic'>{t('common:selectGame.selectGameDesc3')}</StyledText>
						<Spacing />
						{viewModel.selectedFirstGame 
							? <StyledText type='ListItemSubTitleBold' color={theme.lightGrey}>{t('common:selectGame.selection', { gameTitle: translateGameName(viewModel.selectedFirstGame.id) })}</StyledText> 
							: null
						}
					</ParagraphView>
				</Condition>
				<SelectFirstGameContentContainer style={{
					justifyContent: viewModel.filteredGames.length === 1 ? 'flex-start' : 'center',
					paddingLeft: viewModel.filteredGames.length === 1 ? 6 : 0
				}}>
					{viewModel.filteredGames.map((game, index) => (
						<GameListItem
							key={index}
							game={game}
							enabled={viewModel.selectedFirstGame?.id === game.id}
							enabledColor={viewModel.selectedFirstGame?.id === game.id ? theme.lightPurple : theme.midGrey}
							onPress={(): void => actions.setSelectedFirstGame(game)}
						/>
					))}
				</SelectFirstGameContentContainer>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default SelectFirstGame;