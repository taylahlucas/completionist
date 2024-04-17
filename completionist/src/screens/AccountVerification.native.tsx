import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import Button from '@components/general/Button/Button.native';
// import AccountVerificationContent from '@components/custom/LoginForm/AccountVerificationContent.native';
// import AccountVerificationButton from '@components/custom/LoginForm/AccountVerificationButton';

const AccountVerification = () => {
	const [token, setVerificationToken] = useState('');
	const { verificationToken } = useLoginState();

	// TOOD: Add to translations
	// TODO: Create verification entry
	return (
		<StandardLayout>
			<NavigationHeader title={'Verify Your Account'} leftAction='none' />

			<Button
				title={'Continue'}
				onPress={(): void => console.log("Verify")}
			/>

		</StandardLayout>
	);
};

export default AccountVerification;