import React, { useRef } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import {
  Button,
  Condition,
  Spacing,
  ScrollableList,
  SelectionList,
} from '@components/general';
import {
  SettingsDescription,
  SettingsAccountDetails,
  SettingsGameCollections,
  SettingsSelectLanguage,
} from '@components/custom';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useSettings } from './hooks/use-game-settings';
import { SteamProfileModal } from '@screens/achievements';
import { useTranslation } from 'react-i18next';

export const GameSettingsContent = () => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);
  const { viewModel, actions } = useSettings();

  return (
    <>
      <ScrollableList
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: viewModel.isLanguagesOpen ? 200 : 100,
        }}>
        <SettingsAccountDetails />

        <Condition condition={!!viewModel.user.steamId}>
          <Button
            type="navigation"
            title="Steam Profile"
            style={{ marginTop: 0 }}
            onPress={async (): Promise<void> => {
              if (viewModel.user.steamId) {
                const profile = await actions.getSteamUserById(
                  viewModel.user.steamId,
                );

                if (!!profile) {
                  actions.setProfile(profile);
                  actions.setProfileVisible(true);
                }
              }
            }}
          />
        </Condition>

        {/* Enable/Disable game collections */}
        <SettingsGameCollections />

        {/* Enable/Disable DLC */}
        <SettingsDescription align="left">
          {t('common:settings.enabledDLC')}
        </SettingsDescription>
        <SelectionList
          type="enable-dlc"
          data={actions.getDLCOptions()}
          onPress={actions.setDLCOptions}
          translationKey={viewModel.selectedGameSettings}
        />

        {/* Show sections */}
        <SettingsDescription align="left">
          {t('common:settings.showHide')}
        </SettingsDescription>
        <SelectionList
          type="show-hide-sections"
          data={viewModel.options}
          onPress={(id: string): void => actions.setSettingsOptionsOnPress(id)}
          translationKey="disabledSections"
        />

        {/* Select language */}
        <SettingsDescription ref={languageViewRef} align="left">
          {t('common:settings.selectLanguage')}
        </SettingsDescription>
        <SettingsSelectLanguage
          isOpen={viewModel.isLanguagesOpen}
          setOpen={(value: boolean) => {
            actions.setLanguagesOpen(value);
            if (value) {
              languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
                actions.handleScroll(scrollViewRef, y + 100);
              });
            }
          }}
        />

        {/* Delete Account */}
        <Spacing />
        <Button
          title="Delete Account"
          color={theme.error}
          onPress={(): void => actions.deleteUserData(viewModel.user.userId)}
        />
      </ScrollableList>
      {/* // TODO: Replace with bottom sheet */}
      {!!viewModel.user.steamId &&
      !!viewModel.profile &&
      viewModel.profileVisible ? (
        <SteamProfileModal
          profile={viewModel.profile}
          isVisible={viewModel.profileVisible}
          onClose={(): void => actions.setProfileVisible(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};
