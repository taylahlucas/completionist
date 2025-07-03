import React, { useRef, useState } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import {
  Button,
  Condition,
  ScrollableList,
  Spacing,
} from '@components/general';
import {
  SettingsDescription,
  SettingsAccountDetails,
  SettingsSelectLanguage,
} from '@components/custom';
import { useMainState } from '@redux/hooks';
import { SteamProfile } from '@utils/custom-interfaces';
import { useEditUserData, getSteamUserById } from '@data/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { handleScroll } from '@utils/hooks';
import { useTranslation } from 'react-i18next';
import { SteamProfileModal } from '@screens/achievements';

export const GlobalSettingsContent = () => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);

  const [isLanguagesOpen, setIsLanguagesOpen] = useState<boolean>(false);
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);

  const { user } = useMainState();
  const { deleteUserData } = useEditUserData();

  return (
    <ScrollableList
      ref={scrollViewRef}
      contentContainerStyle={{
        paddingBottom: isLanguagesOpen ? 200 : 100,
      }}>
      <SettingsAccountDetails />
      <Condition condition={!!user.steamId}>
        <Button
          type="navigation"
          title="Steam Profile"
          style={{ marginTop: 0 }}
          onPress={async (): Promise<void> => {
            if (user.steamId) {
              const response = await getSteamUserById(user.steamId);

              if (!!response) {
                setProfile(response);
                setProfileVisible(true);
              }
            }
          }}
        />
      </Condition>

      {/* Select language */}
      <SettingsDescription ref={languageViewRef} align="left">
        {t('common:settings.selectLanguage')}
      </SettingsDescription>
      <SettingsSelectLanguage
        isOpen={isLanguagesOpen}
        setOpen={(value: boolean) => {
          setIsLanguagesOpen(value);
          if (value) {
            languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
              handleScroll(scrollViewRef, y + 100);
            });
          }
        }}
      />

      <Spacing />
      <Button
        title="Delete Account"
        color={theme.error}
        onPress={(): void => deleteUserData(user.userId)}
      />
      {!!user.steamId && !!profile && profileVisible ? (
        <SteamProfileModal
          profile={profile}
          isVisible={profileVisible}
          onClose={(): void => setProfileVisible(false)}
        />
      ) : (
        <></>
      )}
    </ScrollableList>
  );
};
