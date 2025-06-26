import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnauthorizedScreenEnum, UserResponse } from '@utils/index';
import { VerificationContent } from '@components/custom';
import { useVerifyAccount } from './hooks';
import { getUserLang } from '@utils/helpers';

export const VerifyAccount = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useVerifyAccount();

  return (
    <StandardLayout isLoading={viewModel.isLoading}>
      <NavigationHeader
        id={UnauthorizedScreenEnum.VerifyAccount}
        title={t('common:screens.verifyAccount')}
        leftAction="back"
      />
      <VerificationContent
        email={viewModel.loginFormData.email}
        token={viewModel.verificationToken ?? ''}
        action={() =>
          actions
            .signUp({ data: viewModel.loginFormData, lang: getUserLang() })
            .then((userResponse: UserResponse) => {
              if (userResponse) {
                const updatedUser = {
                  ...userResponse,
                  signup: {
                    ...userResponse.signup,
                    setUsername: true,
                  },
                };
                actions.saveUser(updatedUser);
                actions.setVerificationToken(undefined);
              }
            })
        }
      />
    </StandardLayout>
  );
};
