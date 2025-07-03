import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '@navigation/index';
import { StandardLayout } from '@components/general';
import { DrawerScreenEnum } from '@utils/index';
import { useSettings } from '../../features/settings/hooks';
import { GameSettingsContent } from '@features/settings';

export const Settings = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useSettings();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Settings}
        title={t('common:screens.settings')}
        leftAction="menu"
        rightAction="none"
      />
      <GameSettingsContent />
    </StandardLayout>
  );
};
