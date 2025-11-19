import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, ScrollableList, StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { AuthScreenEnum } from '@utils/index';
import { useGlobalAchievements } from '@features/achievements/hooks';
import { SteamAchievementDropdownTitle } from '@features/steam-profile/views';
import { ProgressViewDropdown } from '@features/achievements/views';

export const GlobalAchievements = () => {
  const { t } = useTranslation();
  // const navigation = useReactNavigation();
  const { viewModel, actions } = useGlobalAchievements();

  return (
    <StandardLayout>
      <NavigationHeader
        id={AuthScreenEnum.GlobalAchievements}
        title={t('common:screens.achievements')}
        leftAction="none"
        rightAction="back"
      />
      <ScrollableList style={{ maxHeight: 600 }}>
        {/* Game Progress */}
        <Dropdown
          isOpen={viewModel.progressViewOpen}
          setOpen={(): void =>
            actions.setProgressViewOpen(!viewModel.progressViewOpen)
          }
          header={
            <SteamAchievementDropdownTitle
              title={t('common:achievements.progress')}
              isOpen={viewModel.progressViewOpen}
            />
          }>
          {viewModel.activeGames.map(game => (
            <ProgressViewDropdown
              key={game.id}
              title={t(`common:categories.${game.id}.title`)}
              data={actions.getGameProgress([game.id])}
            />
          ))}
        </Dropdown>
        <></>
        {/* Steam Achievements */}
        {/* // TODO: Fix here 
        <Dropdown
          isOpen={viewModel.achievementsState.isOpen}
          setOpen={(): void =>
            actions.setAchievementsState({
              ...viewModel.achievementsState,
              isOpen: !viewModel.achievementsState.isOpen,
            })
          }
          header={
            <SteamAchievementDropdownTitle
              title={t('common:screens.steamAchievements')}
              isOpen={viewModel.achievementsState.isOpen}
            />
          }>
          {/* User doesn't have permission 
          <Condition
            condition={
              !!viewModel.steamId && !viewModel.achievementsState.hasPermission
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
            </View>
          </Condition>

          {/* Steam Achievement List 
          <Condition
            condition={
              !!viewModel.steamId && viewModel.achievementsState.hasPermission
            }>
            {viewModel.activeGames.map(game => (
              <SteamAchievementView
                key={game.id}
                gameId={game.id}
                items={viewModel.achievementsState.items}
                itemsLength={viewModel.achievementsState.noOfLocked}
                title={t(`common:categories.${game.id}.title`)}
                currentOpen={viewModel.steamAchievementsOpen}
                setCurrentOpen={actions.setSteamAchievementsOpen}
              />
            ))}
          </Condition>
          <Condition condition={!viewModel.steamId}>
            <Button
              type="navigation"
              title={t('common:achievements.linkSteamAccount')}
              onPress={(): void =>
                navigation.navigate(AuthScreenEnum.GlobalSteamAchievements)
              }
            />
          </Condition>
        </Dropdown>
        */}
      </ScrollableList>
    </StandardLayout>
  );
};
