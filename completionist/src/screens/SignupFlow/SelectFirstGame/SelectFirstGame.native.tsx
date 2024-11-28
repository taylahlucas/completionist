import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { useTranslation } from 'react-i18next';
import StyledText from '@components/general/Text/StyledText.native';
import { SelectFirstGameContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import Button from '@components/general/Button/Button.native';
import {KeyboardAvoidingScrollView} from '@components/general/Lists/index';
import {Condition, Spacing, ParagraphView} from '@components/general/index';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import {useTranslateGameContent} from '@data/hooks/index';
import { useSelectFirstGame } from './hooks/useSelectFirstGame.native';

const SelectFirstGame = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();  
	const { viewModel, actions } = useSelectFirstGame();
	const { translateGameName } = useTranslateGameContent();
	
	const renderAwareView = () => (
		<Button
			title={t('common:continue')}
			type='footer'
			disabled={!viewModel.selectedFirstGame}
			onPress={async (): Promise<void> => {
				if (viewModel.selectedFirstGame) {
					const updatedUser = {
						...viewModel.user,
						signup: {
							...viewModel.user.signup,
							selectGame: true
						}
					}
					actions.activateGame(updatedUser, viewModel.selectedFirstGame);
					actions.setIsGoogleSignIn(false);
				}
			}}
		/>
	);

	return (
		<StandardLayout isLoading={viewModel.isLoading}>
			<NavigationHeader 
				id={UnauthorizedScreenEnum.SelectFirstGame} 
				title={t('common:screens.selectGame')} 
				leftAction={viewModel.isGoogleSignIn ? 'back' : 'none'}
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
							? <StyledText type='ListItemSubTitleBold' color={theme.lightGrey}>{t('common:selectGame.selection', { gameTitle: translateGameName(viewModel.selectedFirstGame) })}</StyledText> 
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
							flow='signup'
							game={game}
							enabled={viewModel.selectedFirstGame === game.id}
							enabledColor={viewModel.selectedFirstGame === game.id ? theme.lightPurple : theme.midGrey}
							onPress={(): void => actions.setSelectedFirstGame(game.id)}
						/>
					))}
				</SelectFirstGameContentContainer>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default SelectFirstGame;