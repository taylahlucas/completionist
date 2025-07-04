import React from 'react';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { DrawerScreenEnum } from '@utils/index';
import { LinkSteamProfileContent } from '@features/achievements';
import { useMainState } from '@redux/hooks';
import { useTranslation } from 'react-i18next';

export const LinkSteamProfile = () => {
  const { t } = useTranslation();
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.LinkSteamProfile}
        title={
          !user.steamId
            ? t('common:screens.addSteamId')
            : t('common:screens.steamAchievements')
        }
        leftAction="back"
      />
      <LinkSteamProfileContent />
    </StandardLayout>
  );
};
