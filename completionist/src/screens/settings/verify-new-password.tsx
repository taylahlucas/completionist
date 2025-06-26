import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnauthorizedScreenEnum } from '@utils/index';
import { VerificationContent } from '@components/custom';
import { useVerifyNewPassword } from './hooks';

export const VerifyNewPassword = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useVerifyNewPassword();

  return (
    <StandardLayout>
      <NavigationHeader
        id={UnauthorizedScreenEnum.VerifyNewPassword}
        title={t('common:screens.verifyNewPw')}
        leftAction="back"
      />
      <VerificationContent
        email={viewModel.loginFormData.email}
        token={viewModel.verificationToken ?? ''}
        action={actions.forgotPassword}
      />
    </StandardLayout>
  );
};
