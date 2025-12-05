import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { LoginContent } from '@features/login';
import { useIsRequestLoading } from '@api/';

export const Login = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.Login}
        title={t('common:appTitle')}
        leftAction={'none'}
      />
      <LoginContent />
    </StandardLayout>
  );
};
