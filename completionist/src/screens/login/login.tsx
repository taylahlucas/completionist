import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnauthorizedScreenEnum } from '@utils/index';
import { LoginContent } from '@features/login';
import { useIsRequestLoading } from '@data/api/hooks';

export const Login = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnauthorizedScreenEnum.Login}
        title={t('common:appTitle')}
        leftAction={'none'}
      />
      <LoginContent />
    </StandardLayout>
  );
};
