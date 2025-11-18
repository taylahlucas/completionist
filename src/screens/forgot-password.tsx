import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { ForgotPasswordContent } from '@features/login';

export const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.ForgotPassword}
        title={t('common:screens.forgotPw')}
        leftAction="back"
      />
      <ForgotPasswordContent />
    </StandardLayout>
  );
};
