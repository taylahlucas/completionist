import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import { Dropdown } from '@components/general/Dropdown/index';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import { ScrollableList } from '@components/general/Lists/index';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import Button from '@components/general/Button/Button.native';
import { Condition, Spacing } from '@components/general/index';
import { View } from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import useGlobalAchievements from './hooks/useGlobalAchievements';
import ProgressViewDropdown from '@components/custom/ProgressView/ProgressViewDropdown.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import TextWithBackground from '@components/general/Text/TextWithBackground.native';

const GlobalAchievements = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
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
            <AchievementDropdownTitle
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

        {/* Achievements */}
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

          {/* User doesn't have permission */}
          <Condition
            condition={
              !!viewModel.steamId && viewModel.achievementsState.hasPermission
            }>
            {viewModel.activeGames.map(game => (
              <AchievementView
                key={game.id}
                gameId={game.id}
                items={viewModel.achievementsState.items}
                itemsLength={viewModel.achievementsState.noOfLocked}
                title={t(`common:categories.${game.id}.title`)}
                currentOpen={viewModel.currentAchievementOpen}
                setCurrentOpen={actions.setCurrentAchievementOpen}
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
      </ScrollableList>
    </StandardLayout>
  );
};

export default GlobalAchievements;
