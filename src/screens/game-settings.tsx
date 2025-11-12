import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '@navigation/index';
import { StandardLayout } from '@components/general';
import { DrawerScreenEnum } from '@utils/index';
import { GameSettingsContent } from '@features/settings';

export const GameSettings = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.GameSettings}
        title={t('common:screens.settings')}
        leftAction="menu"
        rightAction="none"
      />
      <GameSettingsContent />
    </StandardLayout>
  );
};
