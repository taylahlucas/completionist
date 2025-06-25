import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import { KeyboardAvoidingScrollView } from '@components/general/Lists';
import { Spacing, ParagraphView } from '@components/general';
import Button from '@components/general/button/button';
import { getSteamUserById } from '@data/api/endpoints';
import { SteamProfileModal } from '@screens/achievements';
import { SteamProfile } from '@utils/custom-interfaces';

export const AddSteamIDContent = () => {
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
      <ParagraphView>
        <StyledText type={'ListItemSubTitleBold'}>
          {t('common:steamAchievements.addSteamIdDesc1')}
        </StyledText>
        <Spacing />
        <StyledText>{t('common:steamAchievements.addSteamIdDesc2')}</StyledText>
        <Spacing />
        <StyledText>https://steamcommunity.com/profiles/id/</StyledText>
        <TextInput
          placeholder={t('common:steamAchievements.steamIdPlaceholder')}
          value={steamId}
          inputStyle="text"
          inputMode="numeric"
          onChangeText={(value: string): void => setSteamId(value)}
          onReset={() => setSteamId('')}
        />
        <Spacing />
        <StyledText type={'ListItemSubTitleBold'}>
          {t('common:steamAchievements.addSteamIdStep2')}
        </StyledText>
        <Spacing />
        <StyledText>{t('common:steamAchievements.addSteamIdDesc3')}</StyledText>
        <Spacing />
        <StyledText>{t('common:steamAchievements.addSteamIdDesc4')}</StyledText>
      </ParagraphView>
      <Image
        style={{ width: 300, marginTop: -12 }}
        source={require('@styles/images/steam-public-details.png')}
        resizeMode="contain"
      />
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
