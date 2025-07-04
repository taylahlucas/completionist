import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnauthorizedScreenEnum, UserResponse } from '@utils/index';
import { VerificationContent } from '@components/custom';
import { getUserLang } from '@utils/helpers';
import { useVerifyAccount } from './hooks';

export const VerifyAccountContent = () => {
  const { viewModel, actions } = useVerifyAccount();

  return (
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
  );
};
