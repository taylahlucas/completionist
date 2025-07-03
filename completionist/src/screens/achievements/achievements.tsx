import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  StandardLayout,
  Button,
  StyledText,
  Condition,
  Spacing,
  TextWithBackground,
  ScrollableList,
} from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { AuthScreenEnum, DrawerScreenEnum } from '@utils/index';
import { Dropdown } from '@components/general/dropdown';
import { useReactNavigation } from '@navigation/hooks';
import { useAchievements } from './hooks';
import { SMALL_PADDING } from '@styles/global';
import {
  ProgressView,
  SteamAchievementView,
  SteamAchievementDropdownTitle,
} from '@components/custom';

export const Achievements = () => {
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
                  navigation.navigate(DrawerScreenEnum.SteamAchievements)
                }
              />
            </View>
          </Condition>

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

          {/* Steam Achievement List */}
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
          <Condition condition={!viewModel.user.steamId}>
            <Button
              type="navigation"
              title={t('common:achievements.linkSteamAccount')}
              onPress={
                (): void => navigation.navigate(AuthScreenEnum.SteamProfile)
                // navigation.navigate(DrawerScreenEnum.SteamAchievements)
              }
            />
          </Condition>
        </Dropdown>
      </ScrollableList>
    </StandardLayout>
  );
};
