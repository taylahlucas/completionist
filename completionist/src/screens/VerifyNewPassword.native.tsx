import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch'
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

const VerifyNewPassword = () => {
	const navigation = useReactNavigation();
	const { t } = useTranslation();
	const { loginFormData, verificationToken } = useLoginState();
	const { setLoginFormData } = useLoginDispatch();
	const { forgotPw } = useAuthEndpoints();
	
	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.VerifyNewPassword} title={t('common:screens.verifyNewPw')} leftAction='back' />
			<VerificationContent
				email={loginFormData.email}
				token={verificationToken ?? ''}
				action={(): void => {
					if (loginFormData.password) {
						forgotPw({
							email: loginFormData.email,
							newPw: loginFormData.password
						})
							.then(() => {
								Alert.alert(
									t('common:auth.updatePwSuccess'),
									'',
									[
										{
											text: t('common:alerts.ok'),
											onPress: () => {
												setLoginFormData(initialFormData);
												navigation.navigate(UnauthorizedScreenEnum.Login);
											}
										},
									]
								);
							})
					}
				}}
			/>
		</StandardLayout>
	);
};

export default VerifyNewPassword;