import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { UserResponse } from '@utils/CustomTypes';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';
import useSignupFlow from './useSignupFlow';

const AccountVerification = () => {
	const { t } = useTranslation();
	const { viewModel, actions } = useSignupFlow();

	return (
		<StandardLayout isLoading={viewModel.isLoading}>
			<NavigationHeader id={UnauthorizedScreenEnum.AccountVerification} title={t('common:screens.verifyAccount')} leftAction='back' />
			<VerificationContent
				email={viewModel.loginFormData.email}
				token={viewModel.verificationToken ?? ''}
				action={() => actions.signUp({ data: viewModel.loginFormData })
					.then((userResponse: UserResponse) => {
						if (userResponse) {
							const updatedUser = {
								...userResponse,
								signup: {
									...userResponse.signup,
									setUsername: true
								}
							}
							actions.saveUser(updatedUser);
							actions.setVerificationToken(undefined);
						}
					})}
			/>
		</StandardLayout>
	);
};

export default AccountVerification;