import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UserResponse } from '@utils/CustomTypes';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useIsLoading from '@data/api/hooks/useIsLoading.native';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';

const AccountVerification = () => {
	const { t } = useTranslation();
	const { loginFormData, verificationToken } = useLoginState();
	const { setVerificationToken } = useLoginDispatch();
	const { saveUser } = useEditUserData();
	const { signUp } = useAuthEndpoints();
	const isLoading = useIsLoading();

	return (
		<StandardLayout isLoading={isLoading}>
			<NavigationHeader id={UnauthorizedScreenEnum.AccountVerification} title={t('common:screens.verifyAccount')} leftAction='back' />
			<VerificationContent
				email={loginFormData.email}
				token={verificationToken ?? ''}
				action={() => signUp({ data: loginFormData })
					.then((userResponse: UserResponse) => {
						if (userResponse) {
							const updatedUser = {
								...userResponse,
								signup: {
									...userResponse.signup,
									setUsername: true
								}
							}
							saveUser(updatedUser);
							setVerificationToken(undefined);
						}
					})}
			/>
		</StandardLayout>
	);
};

export default AccountVerification;