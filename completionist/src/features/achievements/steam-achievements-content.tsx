import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Spacing,
  ParagraphView,
  StyledText,
  TextInput,
  Button,
  KeyboardAvoidingScrollView,
} from '@components/general';
import { getSteamUserById } from '@data/index';
import { SteamProfileModal } from '@screens/index';
import { SteamProfile } from '@utils/index';
import { AddSteamProfile } from './add-steam-profile';

export const SteamAchievementsContent = () => {
  const { t } = useTranslation();
  const [steamId, setSteamId] = useState<string>('');
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);

  return (
    <KeyboardAvoidingScrollView
      awareView={
        <Button
          title={t('common:continue')}
          type="footer"
          disabled={steamId.length < 17}
          onPress={async (): Promise<void> => {
            const profile = await getSteamUserById(steamId);

            if (!!profile) {
              setProfile(profile);
              setProfileVisible(true);
            }
          }}
        />
      }>
      <AddSteamProfile steamId={steamId} setSteamId={setSteamId} />
      {profileVisible && !!profile ? (
        <SteamProfileModal
          profile={profile}
          isVisible={profileVisible}
          viewType="add"
          onClose={(): void => setProfileVisible(false)}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingScrollView>
  );
};
