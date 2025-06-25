import React, { useRef } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/navigation-header';
import { ScrollableList, SelectionList } from '@components/general/Lists/index';
import SettingsAccountDetails from '@components/custom/settings/settings-account-details';
import { SettingsDescription } from '@components/custom/settings/settings-styled-components';
import SettingsSelectLanguage from '@components/custom/settings/settings-select-language';
import { DrawerScreenEnum, AuthScreenEnum } from '@utils/CustomEnums';
import SettingsGameCollections from '@components/custom/settings/settings-game-collections';
import Button from '@components/general/Button/Button.native';
import SteamProfileModal from '../achievements/steam-profile-modal';
import { Condition, Spacing } from '@components/general/index';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettings from './hooks/useSettings';

const Settings = () => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);
  const { viewModel, actions } = useSettings();

  return (
    <StandardLayout>
      <NavigationHeader
        id={
          viewModel.isGlobalSettings
            ? AuthScreenEnum.GlobalSettings
            : DrawerScreenEnum.Settings
        }
        title={t('common:screens.settings')}
        leftAction={viewModel.navigationActions.left}
        rightAction={viewModel.navigationActions.right}
      />
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
    </StandardLayout>
  );
};

export default Settings;
