import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Button,
  StyledText,
  Condition,
  Spacing,
  TextWithBackground,
  ScrollableList,
} from '@components/general';
import { DrawerScreenEnum } from '@utils/index';
import { Dropdown } from '@components/general/dropdown';
import { useReactNavigation } from '@navigation/hooks';
import { useAchievements } from './hooks';
import { LARGE_PADDING, MID_PADDING, SMALL_PADDING } from '@styles/global';
import {
  SteamAchievementDropdownTitle,
  SteamAchievementView,
} from '@features/steam-profile/views';
import { ProgressView } from './views';

export const AchievementsContent = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const { viewModel, actions } = useAchievements();

  return (
    <ScrollableList style={{ marginBottom: LARGE_PADDING }}>
      {/* Game Progress */}
      <View style={{ paddingVertical: SMALL_PADDING }}>
        {viewModel.gameProgress.map((game, index) => (
          <ProgressView
            key={`${game.id}-${index}`}
            gameId={game.id}
            data={game.data}
          />
        ))}
      </View>

      {/* Steam Achievements */}
      <Dropdown
        isOpen={viewModel.steamAchievementsOpen}
        setOpen={(): void =>
          actions.setSteamAchievementsOpen(!viewModel.steamAchievementsOpen)
        }
        header={
          <SteamAchievementDropdownTitle
            title={t('common:screens.steamAchievements')}
            isOpen={viewModel.steamAchievementsOpen}
          />
        }>
        {/* No permission */}
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
            <StyledText>{t('common:or').toLocaleUpperCase()}</StyledText>
            <TextWithBackground
              value={t('common:achievements.noPermissionReason2')}
            />
            <Button
              title={t('common:achievements.seeInstructions')}
              type="text"
              onPress={(): void =>
                navigation.navigate(DrawerScreenEnum.LinkSteamProfile)
              }
            />
          </View>
        </Condition>

        {/* No achievements available */}
        <Condition
          condition={
            !!viewModel.user.steamId &&
            viewModel.achievementsState.hasPermission &&
            viewModel.achievementsState.items.length === 0
          }>
          <View>
            <StyledText>
              {t('common:achievements.noAchievementsAvailable')}
            </StyledText>
          </View>
        </Condition>

        {/* Steam achievement list */}
        <Condition
          condition={
            !!viewModel.user.steamId &&
            viewModel.achievementsState.hasPermission &&
            viewModel.achievementsState.items.length > 0
          }>
          {viewModel.achievementsState.items.map((item, index) => (
            <SteamAchievementView key={`${item.id}-${index}`} item={item} />
          ))}
        </Condition>

        {/* Link Steam account */}
        <Condition condition={!viewModel.user.steamId}>
          <Button
            type="navigation"
            title={t('common:achievements.linkSteamAccount')}
            onPress={(): void =>
              navigation.navigate(DrawerScreenEnum.LinkSteamProfile)
            }
          />
        </Condition>
      </Dropdown>
    </ScrollableList>
  );
};
