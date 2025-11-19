import React from 'react';
import { UserResponse } from '@utils/index';
import { getUserLang } from '@utils/helpers';
import { useVerifyAccount } from './hooks';
import { VerificationContent } from './views/verification-content';

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
