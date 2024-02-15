import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import Button from '@components/general/Button/Button.native';
import { ScreenEnum } from '@utils/CustomEnums';
import StyledText from '@components/general/Text/StyledText.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useMainState from '@redux/hooks/useMainState';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useGetGameImage from '@components/custom/GameList/hooks/useGetGameImage.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import Spacing from '@components/general/Spacing.native';
import useFormatter from '@utils/hooks/useFormatter';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';

const SelectFirstGame = () => {
	// const { t } = useTranslation();
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const [searchValue, setSearchValue] = useState('');
	const [selectedGame, setSelectedGame] = useState<SubscriptionData>();
	const { setUser } = useMainDispatch();
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	const { translateGameName } = useTranslateGameContent();
	const { getGameImage } = useGetGameImage();
	const { updateUserInfo } = useEndpoints();
	const { getFormattedSearchString } = useFormatter();
	const { saveUserAndLogin } = useEditUserData();

	return (
		<StandardLayout>
			<NavigationHeader title={'Select a Game'} leftAction='none' />
			<CustomSearchBar
				searchValue={searchValue}
				setSearchValue={(value: string): void => setSearchValue(value)}
				onReset={(): void => setSearchValue('')}
			/>
			<ScrollableList>
				<StyledText>With a Free account, you can select one game per month to track.</StyledText>
				<Spacing />
				<StyledText>Select your first game below!</StyledText>
				<Spacing />
				<StyledText type={'ListItemSubTitleItalic'}>(Don't worry if you make a mistake, you'll be able to change this once per month)</StyledText>
				<View style={{ flexDirection: 'row', marginTop: 16 }}>
					{filterGameList(user.subscription.data, false, getFormattedSearchString(searchValue)).map((game, index) => (
						<Pressable key={index} onPress={(): void => setSelectedGame(game)}>
							<GameListItem
								testID={game.id}
								title={translateGameName(game.id)}
								enabled={selectedGame?.id === game.id ?? false}
								enabledColor={selectedGame?.id === game.id ? theme.lightPurple : theme.midGrey}
								imageUrl={getGameImage(game.id)}
								onPress={(): void => {}}
							/>
						</Pressable>
					))}
				</View>
			</ScrollableList>
			<View style={{ height: 82, backgroundColor: 'red' }}>
				<Button
					style={{ position: 'absolute', alignSelf: 'center', marginTop: 16 }}
					title={'Continue'}
					disabled={!selectedGame}
					onPress={async (): Promise<void> => {
						const updatedGames: SubscriptionData[] = user.subscription.data.map(data => {
							return (data.id === selectedGame?.id)
								? {
									id: data.id,
									isActive: true
								} : data;
						});
						const updatedUser = {
							...user,
							subscription: {
								...user.subscription,
								data: updatedGames
							}
						};
						console.log("user ID: ", updatedUser.userId)
						console.log("SelectFirstGame updatedUser: " , updatedUser.subscription)
						updateUserInfo(updatedUser);
						setSelectedGame(undefined);
						saveUserAndLogin(updatedUser);
						navigation.navigate(ScreenEnum.GameSelection);
					}}
				/>
			</View>
		</StandardLayout>
	);
};

export default SelectFirstGame;