import React from 'react';
// import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UserResponse } from '@utils/CustomTypes';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';


const LinkAccount = () => {
	// const { t } = useTranslation();
	const { loginFormData, verificationToken } = useLoginState();
	const { setVerificationToken } = useLoginDispatch();
	const { saveUser } = useEditUserData();
	const { linkAndSignIn } = useAuthEndpoints();

	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.LinkAccount} title={'Link Your Accounts'} leftAction='back' />
			<VerificationContent
				email={loginFormData.email}
				token={verificationToken ?? ''}
				action={(): Promise<void> => linkAndSignIn({
						email: loginFormData.email,
						password: loginFormData.password
					})
					.then((userResponse: UserResponse) => {
						if (userResponse) {
							saveUser(userResponse);
							setVerificationToken(undefined);
						}
					})
				}
			/>
		</StandardLayout>
	);
};

export default LinkAccount;