import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { DrawerScreenEnum } from '@utils/index';
import { AchievementsContent } from '@features/achievements/achievements-content';

export const Achievements = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Achievements}
        title={t('common:screens.achievements')}
        leftAction="menu"
        rightAction="none"
      />
      <AchievementsContent />
    </StandardLayout>
  );
};
