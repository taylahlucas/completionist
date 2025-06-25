import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import { Dropdown } from '@components/general/Dropdown/index';
import { ScrollableList } from '@components/general/Lists/index';
import SteamAchievementDropdownTitle from '@components/custom/steam-achievement-view/steam-achievement-dropdown-title';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import Button from '@components/general/Button/Button.native';
import { Condition, Spacing } from '@components/general/index';
import StyledText from '@components/general/Text/StyledText.native';
import useAchievements from './hooks/useAchievements';
import { SMALL_PADDING } from '@styles/global.native';
import TextWithBackground from '@components/general/Text/TextWithBackground.native';
import SteamAchievementView from '@components/custom/steam-achievement-view/steam-achievement-view';

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
