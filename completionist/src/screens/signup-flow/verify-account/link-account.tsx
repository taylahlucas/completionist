import React from 'react';
// import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UserResponse, UnauthorizedScreenEnum } from '@utils/index';
import { VerificationContent } from '@components/custom';
import { useVerifyAccount } from './hooks';

export const LinkAccount = () => {
  // const { t } = useTranslation()
  const { viewModel, actions } = useVerifyAccount();

  // TODO: Add to translations
  return (
    <StandardLayout>
      <NavigationHeader
        id={UnauthorizedScreenEnum.LinkAccount}
        title={'Link Your Accounts'}
        leftAction="back"
      />
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
    </StandardLayout>
  );
};
