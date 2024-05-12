import React, { useState } from 'react';
import { Alert, View } from 'react-native';
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
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useIsLoading from '@data/api/hooks/useIsLoading.native';
import ParagraphView from '@components/general/ParagraphView.native';

const AccountVerification = () => {
	const { t } = useTranslation();
	const { loginFormData, verificationToken } = useLoginState();
	const { setVerificationToken } = useLoginDispatch();
	const { saveUser } = useEditUserData();
	const { signUp } = useEndpoints();
	const [value, setValue] = useState<string>('');
	const isLoading = useIsLoading();

	const renderAwareView = (): JSX.Element => {
		return (
			<Button
				title={t('common:continue')}
				type='footer'
				disabled={value.length !== verificationToken?.length}
				onPress={(): void => {
					if (value === verificationToken) {
						signUp({ data: loginFormData })
							.then((userResponse: UserResponse) => {
								if (userResponse) {
									saveUser(userResponse);
									setVerificationToken(undefined);
								}
							});
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
		<StandardLayout isLoading={isLoading}>
			<NavigationHeader id={UnauthorizedScreenEnum.AccountVerification} title={t('common:screens.verifyAccount')} leftAction='none' />
			<ParagraphView>
				<StyledText>{t('common:login.accountVerification')}</StyledText>
			</ParagraphView>
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