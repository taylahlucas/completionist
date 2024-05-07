import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import Button from '@components/general/Button/Button.native';
import VerificationEntry from '@components/general/VerificationEntry/VerificationEntry.native';
import StyledText from '@components/general/Text/StyledText.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import { UserResponse } from '@utils/CustomTypes';

const AccountVerification = () => {
	const { t } = useTranslation();
	const { loginFormData, verificationToken, isSigningUp } = useLoginState();
	const { setVerificationToken } = useLoginDispatch();
	const { saveUserAndLogin } = useEditUserData();
	const { signUp, linkAndSignIn } = useEndpoints();
	const [value, setValue] = useState<string>('');

	const renderAwareView = (): JSX.Element => {
		return (
			<Button
				title={t('common:continue')}
				type='footer'
				disabled={value.length !== verificationToken?.length}
				onPress={(): void => {
					if (value === verificationToken) {
						if (isSigningUp) {
							signUp({ data: loginFormData })
							.then((userResponse: UserResponse) => {
								if (userResponse) {
									saveUserAndLogin(userResponse, true);
								}
							});
						}
						else {
								linkAndSignIn({
									email: loginFormData.email,
									password: loginFormData.password
								})
								.then((userResponse: UserResponse) => {
									if (userResponse) {
										saveUserAndLogin(userResponse, true);
									}
								})
						}
						setVerificationToken(undefined);
					}
					else {
						// TODO: Display differently
						Alert.alert('Incorrect code', 'The code you have entered is incorrect. Please try again');
					}
				}}
			/>
		);
	};

	return (
		<StandardLayout>
			<NavigationHeader title={t('common:screens.verifyAccount')} leftAction='none' />
			<StyledText>{t('common:login.accountVerification')}</StyledText>
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<VerificationEntry
					length={verificationToken?.length ?? 0}
					value={value}
					setValue={setValue}
				/>
				<></>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default AccountVerification;