import React, { useRef, useState } from 'react';
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
import { useGameSettings } from './hooks/use-game-settings';
import { SteamProfileModal } from '@screens/achievements';
import { useTranslation } from 'react-i18next';
import { useMainState } from '@redux/hooks';
import { LanguageType } from '@utils/custom-types';
import { SteamProfile } from '@utils/custom-interfaces';
import { getSteamUserById, useEditUserData } from '@data/index';
import {
  useDLCOptions,
  useGetShowHideOptions,
} from '@components/custom/settings/hooks';
import { handleScroll } from '@utils/hooks';

export const GameSettingsContent = () => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);

  const { onSetGameLanguage, setSettingsOptions } = useGameSettings();
  const { deleteUserData } = useEditUserData();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const showHideOptions = useGetShowHideOptions();

  const { user, selectedGame } = useMainState();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(
    selectedGame?.lang ?? 'en',
  );
  const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);

  if (!selectedGame) return;

  return (
    <>
      <ScrollableList
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: isLanguagesOpen ? 200 : 100,
        }}>
        <SettingsAccountDetails />

        <Condition condition={!!user.steamId}>
          <Button
            type="navigation"
            // TODO: Add to translations
            title="Steam Profile"
            style={{ marginTop: 0 }}
            onPress={async (): Promise<void> => {
              if (user.steamId) {
                const profile = await getSteamUserById(user.steamId);

                if (!!profile) {
                  setProfile(profile);
                  setProfileVisible(true);
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
          data={getDLCOptions()}
          onPress={setDLCOptions}
          translationKey={selectedGame?.id}
        />

        {/* Show sections */}
        <SettingsDescription align="left">
          {t('common:settings.showHide')}
        </SettingsDescription>
        <SelectionList
          type="show-hide-sections"
          data={showHideOptions}
          onPress={(id: string): void => setSettingsOptions(id, user)}
          translationKey="disabledSections"
        />

        {/* Select language */}
        <SettingsDescription ref={languageViewRef} align="left">
          {t('common:settings.selectLanguage')}
        </SettingsDescription>
        <SettingsSelectLanguage
          selectedLanguage={selectedLanguage}
          isOpen={isLanguagesOpen}
          setOpen={(value: boolean) => {
            setLanguagesOpen(value);
            if (value) {
              languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
                handleScroll(scrollViewRef, y + 100);
              });
            }
          }}
          onSetLanguage={(value: string) => {
            setSelectedLanguage(value as LanguageType);
            onSetGameLanguage(value, user, selectedGame);
            setLanguagesOpen(false);
          }}
        />

        {/* Delete Account */}
        <Spacing />
        <Button
          title="Delete Account"
          color={theme.error}
          onPress={(): void => deleteUserData(user.userId)}
        />
      </ScrollableList>
      {/* // TODO: Replace with bottom sheet */}
      {!!user.steamId && !!profile && profileVisible ? (
        <SteamProfileModal
          profile={profile}
          isVisible={profileVisible}
          onClose={(): void => setProfileVisible(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};
