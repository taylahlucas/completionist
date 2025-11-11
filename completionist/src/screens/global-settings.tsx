import React from 'react';
import { StandardLayout } from '@components/general';
import { AuthScreenEnum } from '@utils/custom-enums';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '@navigation/index';
import { GlobalSettingsContent } from '@features/settings';
import { useGetLoginMethods } from '@features/login/login-form/hooks';

export const GlobalSettings = () => {
  const { t } = useTranslation();
  const { signOut } = useGetLoginMethods();

  return (
    <StandardLayout>
      <NavigationHeader
        id={AuthScreenEnum.GlobalSettings}
        title={t('common:screens.settings')}
        leftAction="back"
        rightAction="logout"
        rightCallback={signOut}
      />
      <GlobalSettingsContent />
    </StandardLayout>
  );
};
