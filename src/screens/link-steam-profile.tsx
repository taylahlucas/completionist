import React from 'react';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { DrawerScreenEnum } from '@utils/index';
import { useTranslation } from 'react-i18next';
import { LinkSteamProfileContent } from '@features/steam-profile';
import { useAuthUser } from '@redux/auth';

export const LinkSteamProfile = () => {
  const { t } = useTranslation();
  const user = useAuthUser();

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
