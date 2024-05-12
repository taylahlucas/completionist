import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { UserResponse } from '@utils/CustomTypes';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';


const LinkAccount = () => {
	const { t } = useTranslation();
	const { loginFormData, verificationToken } = useLoginState();
	const { setVerificationToken } = useLoginDispatch();
	const { saveUser } = useEditUserData();
	const { linkAndSignIn } = useEndpoints();
	const [value, setValue] = useState<string>('');

	const action = (): void => {
		if (value === verificationToken) {
			linkAndSignIn({
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
		else {
			// TODO: Display differently
			Alert.alert('Incorrect code', 'The code you have entered is incorrect. Please try again');
		}
	};

	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.LinkAccount} title={'Link Your Accounts'} leftAction='back' />
			<VerificationContent
				email={loginFormData.email}
				token={verificationToken ?? ''}
				value={value}
				setValue={setValue}
				action={action}
			/>
		</StandardLayout>
	);
};

export default LinkAccount;