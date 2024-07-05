import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum, AuthScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import BadgeView from '@components/custom/BadgeView/BadgeView.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { mockBadges } from '@utils/test-helper/__mocks__/mocks';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import useGetGameProgressData from '@data/hooks/useGetGameProgressData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import Condition from '@components/general/Condition.native';
import { View } from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import { AchievementItem } from '@utils/CustomInterfaces';

interface AchievementsState {
	isOpen: boolean;
	hasPermission: boolean;
	items: AchievementItem[];
	noOfLocked: number;
}

const Achievements = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { user, selectedGame } = useMainState();
	const { getSteamPlayerAchievements } = useEndpoints();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);
	const [currentOpen, setCurrentOpen] = useState<string>('');
	const [achievementsState, setAchievementsState] = useState<AchievementsState>({
		isOpen: true,
		hasPermission: !!user.steamId,
		items: [],
		noOfLocked: 0
	});
	const { filterGameList } = useFilterGameList();
	const activeGames = filterGameList(user.activeGames, true, '');
	const { getGameProgress } = useGetGameProgressData();
	const isGlobalAchievements = !selectedGame;

	useEffect(() => {
		const fetchData = async () => {
			const currentGameId = selectedGame ? user.gameData[selectedGame].appId :  user.gameData[activeGames[0].id].appId;

			if (user.steamId) {
				const response = await getSteamPlayerAchievements({ userId: user.userId, steamId: user.steamId, gameId: currentGameId });

				if (!response?.hasPermission) {
					setAchievementsState({
						...achievementsState,
						hasPermission: false
					});
				}
				else if (response?.achievements) {
					const items: AchievementItem[] = response?.noOfLocked > 0 ? [
						...response?.achievements,
						{
							id: 'locked',
							name: response?.noOfLocked + ' Locked Achievements',
							description: 'Unlock these by playing more of the game',
							unlocked: false,
							icon: '',
						}
					] : response?.achievements;
					setAchievementsState({
						...achievementsState,
						hasPermission: true,
						items: items,
						noOfLocked: response?.achievements.length + response?.noOfLocked,
					});
				}
			}
		}

		fetchData();
	}, [selectedGame]);

	return (
		<StandardLayout>
			<NavigationHeader
				id={isGlobalAchievements ? AuthScreenEnum.GlobalAchievements : DrawerScreenEnum.Achievements}
				title={'Achievements'}
				leftAction={isGlobalAchievements ? 'back' : 'menu'}
			/>
			<ScrollableList style={{ maxHeight: 600 }}>
				{/* Badges */}
				{/* <Dropdown
					isOpen={badgesOpen}
					setOpen={(): void => setBadgesOpen(!badgesOpen)}
					header={
						<AchievementDropdownTitle
							title={'Badges'}
							isOpen={badgesOpen}
						/>
					}
				>
					<BadgeView items={mockBadges} />
				</Dropdown> */}

				{/* Achievements */}
				<Dropdown
					isOpen={achievementsState.isOpen}
					setOpen={(): void => setAchievementsState({
						...achievementsState,
						isOpen: !achievementsState.isOpen
					})}
					header={
						<AchievementDropdownTitle
							title={'Steam Achievements'}
							isOpen={achievementsState.isOpen}
						/>
					}
				>
					{/* // TODO: Add to translations */}
					<Condition condition={!!user.steamId && !achievementsState.hasPermission}>
						<View style={{ paddingLeft: 12, paddingRight: 12 }}>
							<StyledText align='left' type='SubHeading'>No permission</StyledText>
							<StyledText align='left'>{`You do not have permission to view your achievements. Please grant permission to 'Game Details' in your steam preferences.\nThis may take a few minutes.`}</StyledText>
						</View>
					</Condition>
					{/* // TODO: This is not working because I'm getting noPermission from here but it's not rendering */}
					<Condition
						condition={!!user.steamId && achievementsState.hasPermission}>
						{activeGames.map(game => (
							<AchievementView
								key={game.id}
								gameId={user.gameData[game.id].appId}
								items={achievementsState.items}
								itemsLength={achievementsState.noOfLocked}
								title={t(`common:categories.${game.id}.title`)}
								currentOpen={currentOpen}
								setCurrentOpen={setCurrentOpen}
							/>
						))}
					</Condition>
					<Condition condition={!user.steamId}>
						<Button
							type='navigation'
							title='Link Steam account'
							onPress={(): void => navigation.navigate(DrawerScreenEnum.SteamAchievements)}
						/>
					</Condition>
				</Dropdown>

				{/* Progress */}
				<Dropdown
					isOpen={progressOpen}
					setOpen={(): void => setProgressOpen(!progressOpen)}
					header={
						<AchievementDropdownTitle
							title={'Progress'}
							isOpen={progressOpen}
						/>
					}
				>
					{getGameProgress(activeGames.map(game => game.id as GameKeyEnum)).map((game) => (
						<ProgressView
							key={game.id}
							gameId={game.id}
							title={t(`common:categories.${game.id}.title`)}
							data={game.data}
						/>
					))}
				</Dropdown>
			</ScrollableList>
		</StandardLayout>
	);
};

export default Achievements;