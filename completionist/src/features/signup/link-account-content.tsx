import React from 'react';
// import { useTranslation } from 'react-i18next';
import { UserResponse } from '@utils/index';
import { VerificationContent } from '@components/custom';
import { useVerifyAccount } from './hooks';

export const LinkAccountContent = () => {
  const { viewModel, actions } = useVerifyAccount();

  return (
    <VerificationContent
      email={viewModel.loginFormData.email}
      token={viewModel.verificationToken ?? ''}
      action={(): Promise<void> =>
        actions
          .linkAndSignIn({
            email: viewModel.loginFormData.email,
            pw: viewModel.loginFormData.pw,
          })
          .then((userResponse: UserResponse) => {
            if (userResponse) {
              actions.saveUser(userResponse);
              actions.setLoggedIn(true);
              actions.setVerificationToken(undefined);
            }
            // TODO: Log user not found -- issue with linkAndSignIn
          })
      }
    />
  );
};
