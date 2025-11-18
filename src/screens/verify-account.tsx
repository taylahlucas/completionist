import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { VerifyAccountContent } from '@features/signup';
import { useIsRequestLoading } from '@data/api/hooks';

export const VerifyAccount = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.VerifyAccount}
        title={t('common:screens.verifyAccount')}
        leftAction="back"
      />
      <VerifyAccountContent />
    </StandardLayout>
  );
};
