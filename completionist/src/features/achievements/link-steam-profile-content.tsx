import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AuthScreenEnum } from '@utils/index';
import {
  Button,
  KeyboardAvoidingScrollView,
  Spacing,
  ParagraphView,
  StyledText,
  TextInput,
} from '@components/general';
import { useReactNavigation } from '@navigation/hooks';

export const LinkSteamProfileContent = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const [steamId, setSteamId] = useState<string>('');

  return (
    <KeyboardAvoidingScrollView
      awareView={
        <Button
          title={t('common:continue')}
          type="footer"
          disabled={steamId.length < 17}
          onPress={async (): Promise<void> =>
            navigation.navigate(AuthScreenEnum.SteamProfile, {
              steamId,
              viewType: 'add',
            })
          }
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
    </KeyboardAvoidingScrollView>
  );
};
