import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import Button from '@components/general/Button/Button.native';
import VerificationEntry from '@components/general/VerificationEntry/VerificationEntry.native';
import StyledText from '@components/general/Text/StyledText.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';

const AccountVerification = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const [isValid, setIsValid] = useState<boolean>(false);
	const { loginFormData, verificationToken } = useLoginState();
	const { saveUserAndLogin } = useEditUserData();
	const { signUp } = useEndpoints();

	return (
		<StandardLayout>
			<NavigationHeader title={t('common:screens.verifyAccount')} leftAction='none' />
			<View style={{ padding: 8 }}>
				<StyledText>{t('common:login.accountVerification')}</StyledText>
				<VerificationEntry token={verificationToken ?? ''} setIsValid={setIsValid} />
				<Button
					title={t('common:continue')}
					disabled={!isValid}
					onPress={(): void => {
						signUp({ data: loginFormData })
							.then((response) => {
								if (response) {
									saveUserAndLogin(response, true);
								}
							})
							.catch((error) => {
								console.log(
									"[AccountVerification] Error creating user: ",
									error.message
								);
							})
					}}
				/>
			</View>
		</StandardLayout>
	);
};

export default AccountVerification;