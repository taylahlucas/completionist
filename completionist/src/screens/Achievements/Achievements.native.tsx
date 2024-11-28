import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum, AuthScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import {Dropdown} from '@components/general/Dropdown/index';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import Button from '@components/general/Button/Button.native';
import {Condition} from '@components/general/index';
import { View } from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import useAchievements from './hooks/useAchievements';

const Achievements = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { viewModel, actions } = useAchievements();

	return (
		<StandardLayout>
			<NavigationHeader
				id={viewModel.achievements.isGlobalAchievements ? AuthScreenEnum.GlobalAchievements : DrawerScreenEnum.Achievements}
				title={'Achievements'}
				leftAction={viewModel.achievements.isGlobalAchievements ? 'back' : 'menu'}
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
					isOpen={viewModel.achievements.achievementsState.isOpen}
					setOpen={(): void => actions.setAchievementsState({
						...viewModel.achievements.achievementsState,
						isOpen: !viewModel.achievements.achievementsState.isOpen
					})}
					header={
						<AchievementDropdownTitle
							title={'Steam Achievements'}
							isOpen={viewModel.achievements.achievementsState.isOpen}
						/>
					}
				>
					{/* // TODO: Add to translations */}
					<Condition condition={!!viewModel.user.steamId && !viewModel.achievements.achievementsState.hasPermission}>
						<View style={{ paddingLeft: 12, paddingRight: 12 }}>
							<StyledText align='left' type='SubHeading'>No permission</StyledText>
							<StyledText align='left'>{`You do not have permission to view your achievements. Please grant permission to 'Game Details' in your steam preferences.\nThis may take a few minutes.`}</StyledText>
						</View>
					</Condition>
					{/* // TODO: This is not working because I'm getting noPermission from here but it's not rendering */}
					<Condition
						condition={!!viewModel.user.steamId && viewModel.achievements.achievementsState.hasPermission}>
						{viewModel.achievements.activeGames.map(game => (
							<AchievementView
								key={game.id}
								gameId={game.id}
								items={viewModel.achievements.achievementsState.items}
								itemsLength={viewModel.achievements.achievementsState.noOfLocked}
								title={t(`common:categories.${game.id}.title`)}
								currentOpen={viewModel.achievements.currentAchievementOpen}
								setCurrentOpen={actions.setCurrentAchievementOpen}
							/>
						))}
					</Condition>
					<Condition condition={!viewModel.user.steamId}>
						<Button
							type='navigation'
							title='Link Steam account'
							onPress={(): void => navigation.navigate(DrawerScreenEnum.SteamAchievements)}
						/>
					</Condition>
				</Dropdown>

				{/* Progress */}
				<Dropdown
					isOpen={viewModel.achievements.progressViewOpen}
					setOpen={(): void => actions.setProgressViewOpen(!viewModel.achievements.progressViewOpen)}
					header={
						<AchievementDropdownTitle
							title={'Progress'}
							isOpen={viewModel.achievements.progressViewOpen}
						/>
					}
				>
					{/* // TODO: Fix here */}
					{actions.getGameProgress(viewModel.achievements.activeGames.map(game => game.id as GameKeyEnum)).map((game) => (
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