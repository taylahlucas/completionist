import React, { useRef, useState } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import {
  Button,
  Condition,
  ScrollableList,
  Spacing,
} from '@components/general';
import { useEditUserData } from '@data/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { handleScroll } from '@utils/helpers/index';
import { useTranslation } from 'react-i18next';
import { LanguageType } from '@utils/custom-types';
import { useReactNavigation } from '@navigation/hooks';
import { AuthScreenEnum } from '@utils/custom-enums';
import {
  SettingsAccountDetails,
  SettingsDescription,
  SettingsSelectLanguage,
} from './views';
import { DEFAULT_LANG, languages } from '@utils/index';
import { useAuthState } from '@redux/auth';

export const GlobalSettingsContent = () => {
  const { t, i18n } = useTranslation();
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { updateUserData } = useEditUserData();
  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);
  const [isLanguagesOpen, setIsLanguagesOpen] = useState<boolean>(false);
  const { user } = useAuthState();
  const { deleteUserData } = useEditUserData();

  return (
    <ScrollableList
      ref={scrollViewRef}
      contentContainerStyle={{
        paddingBottom: isLanguagesOpen ? 200 : 100,
      }}>
      <SettingsAccountDetails />
      <Condition condition={!!user?.steamId}>
        <Button
          type="navigation"
          // TODO: Add to translations
          title="Steam Profile"
          style={{ marginTop: 0 }}
          onPress={async (): Promise<void> => {
            if (user?.steamId) {
              navigation.navigate(AuthScreenEnum.SteamProfile, {
                steamId: user.steamId,
              });
            }
          }}
        />
      </Condition>

      {/* Select language */}
      <SettingsDescription ref={languageViewRef} align="left">
        {t('common:settings.selectLanguage')}
      </SettingsDescription>
      <SettingsSelectLanguage
        languages={languages}
        selectedLanguage={user?.settings.lang ?? DEFAULT_LANG}
        isOpen={isLanguagesOpen}
        setOpen={(value: boolean) => {
          setIsLanguagesOpen(value);
          if (value) {
            languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
              handleScroll(scrollViewRef, y + 100);
            });
          }
        }}
        onSetLanguage={(value: string): void => {
          // TODO: Handle no user
          if (user) {
            i18n.changeLanguage(value);
            updateUserData({
              ...user,
              settings: {
                ...user.settings,
                lang: value as LanguageType,
              },
            });
            setIsLanguagesOpen(false);
          }
        }}
      />

      <Spacing />
      <Button
        title="Delete Account"
        color={theme.error}
        onPress={(): void => user && deleteUserData(user.userId)}
      />
    </ScrollableList>
  );
};
