import React, { useRef, useState } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Condition,
  Spacing,
  ScrollableList,
  SelectionList,
} from '@components/general';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useGameSettings } from './hooks';
import { useMainState } from '@redux/hooks';
import { LanguageType, AuthScreenEnum, DEFAULT_LANG } from '@utils/index';
import { useEditUserData } from '@data/index';
import { getGameLanguages, handleScroll } from '@utils/helpers/index';
import { useDLCOptions, useGetShowHideOptions } from './views/hooks';
import { useReactNavigation } from '@navigation/hooks';
import {
  SettingsAccountDetails,
  SettingsDescription,
  SettingsGameCollections,
  SettingsSelectLanguage,
} from './views';
import { useAuthUser } from '@redux/auth';

export const GameSettingsContent = () => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const languageViewRef = useRef<RNText>(null);

  const { onSetGameLanguage, setSettingsOptions } = useGameSettings();
  const { deleteUserData } = useEditUserData();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const showHideOptions = useGetShowHideOptions();

  const { selectedGameData } = useMainState();
  const user = useAuthUser();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(
    selectedGameData?.lang ?? DEFAULT_LANG,
  );
  const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);

  if (!selectedGameData) return;

  return (
    <>
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
          translationKey={selectedGameData.id}
        />

        {/* Show sections */}
        <SettingsDescription align="left">
          {t('common:settings.showHide')}
        </SettingsDescription>
        <SelectionList
          type="show-hide-sections"
          data={showHideOptions}
          onPress={(id: string): void => user && setSettingsOptions(id, user)}
          translationKey="disabledSections"
        />

        {/* Select language */}
        <SettingsDescription ref={languageViewRef} align="left">
          {t('common:settings.selectLanguage')}
        </SettingsDescription>
        <SettingsSelectLanguage
          languages={getGameLanguages(selectedGameData.id)}
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
            // TODO: Handle now user
            if (user) {
              setSelectedLanguage(value as LanguageType);
              onSetGameLanguage(value, user, selectedGameData);
              setLanguagesOpen(false);
            }
          }}
        />

        {/* Delete Account */}
        <Spacing />
        <Button
          title="Delete Account"
          color={theme.error}
          onPress={(): void => user && deleteUserData(user.userId)}
        />
      </ScrollableList>
    </>
  );
};
