import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import { Dropdown } from '@components/general/Dropdown/index';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import { ScrollableList } from '@components/general/Lists/index';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import Button from '@components/general/Button/Button.native';
import { Condition, Spacing } from '@components/general/index';
import StyledText from '@components/general/Text/StyledText.native';
import useAchievements from './hooks/useAchievements';
import { SMALL_PADDING } from '@styles/global.native';
import TextWithBackground from '@components/general/Text/TextWithBackground.native';

const Achievements = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const { viewModel, actions } = useAchievements();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Achievements}
        title={t('common:screens.achievements')}
        leftAction="menu"
        rightAction="none"
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

        {/* Game Progress */}
        <View style={{ paddingVertical: SMALL_PADDING }}>
          {viewModel.gameProgress.map(game => (
            <ProgressView key={game.id} gameId={game.id} data={game.data} />
          ))}
        </View>

        {/* Steam Achievements */}
        <Dropdown
          isOpen={viewModel.achievementsState.isOpen}
          setOpen={(): void =>
            actions.setAchievementsState({
              ...viewModel.achievementsState,
              isOpen: !viewModel.achievementsState.isOpen,
            })
          }
          header={
            <AchievementDropdownTitle
              title={t('common:screens.steamAchievements')}
              isOpen={viewModel.achievementsState.isOpen}
            />
          }>
          {/* // TODO: Add to translations */}
          <Condition
            condition={
              !!viewModel.user.steamId &&
              !viewModel.achievementsState.hasPermission
            }>
            <View style={{ paddingLeft: 12, paddingRight: 12 }}>
              <StyledText align="left" type="SubHeading">
                {t('common:achievements.noSteamPermissionTitle')}
              </StyledText>
              <StyledText align="left">
                {t('common:achievements.noSteamPermissionDesc')}
              </StyledText>
              <Spacing />
              <TextWithBackground
                value={t('common:achievements.noPermissionReason1')}
              />
              <StyledText>OR</StyledText>
              <TextWithBackground
                value={t('common:achievements.noPermissionReason2')}
              />
            </View>
          </Condition>
          {/* // TODO: This is not working because I'm getting noPermission from here but it's not rendering */}
          <Condition
            condition={
              !!viewModel.user.steamId &&
              viewModel.achievementsState.hasPermission
            }>
            <AchievementView
              key={viewModel.gameId}
              gameId={viewModel.gameId}
              items={viewModel.achievementsState.items}
              itemsLength={viewModel.achievementsState.noOfLocked}
              title={t(`common:categories.${viewModel.gameId}.title`)}
              currentOpen={viewModel.currentAchievementOpen}
              setCurrentOpen={actions.setCurrentAchievementOpen}
            />
          </Condition>
          <Condition condition={!viewModel.user.steamId}>
            <Button
              type="navigation"
              title={t('common:achievements.linkSteamAccount')}
              onPress={(): void =>
                navigation.navigate(DrawerScreenEnum.SteamAchievements)
              }
            />
          </Condition>
        </Dropdown>
      </ScrollableList>
    </StandardLayout>
  );
};

export default Achievements;
