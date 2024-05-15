import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import ParagraphView from '@components/general/ParagraphView.native';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import Button from '@components/general/Button/Button.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import useValidator from '@utils/hooks/useValidator';
import Condition from '@components/general/Condition.native';
import ErrorMessage from '@components/general/Text/ErrorMessage.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';

const ForgotPassword = () => {
	const { t } = useTranslation();
	const { loginFormData } = useLoginState();
	const { setLoginFormData } = useLoginDispatch();
	const [submitPressed, setSubmitPressed] = useState<boolean>(false);
	const sendVerificationEmail = useSendVerificationEmail();
	const { checkUserExists } = useAuthEndpoints();
	const { isPwValid } = useValidator();

	const renderAwareView = () => (
		<Button
			testID='forgot-password'
			type='footer'
			title={t('common:continue')}
			disabled={!loginFormData.email || !loginFormData.pw}
			onPress={() => {
				setSubmitPressed(true);
				if (isPwValid(loginFormData.pw ?? '')) {
					checkUserExists(loginFormData.email)
						.then((accounts) => {
							if (accounts.regular || accounts.google) {
								sendVerificationEmail(
									loginFormData.email,
									t('common:auth.resetPw'),
									UnauthorizedScreenEnum.VerifyNewPassword
								);
							}
							else {
								Alert.alert(
									t('common:errors.emailNotFound'),
									t('common:errors.differentEmail')
								)
							}
							setSubmitPressed(false);
						})
				}
			}}
		/>
	);

	return (
		<StandardLayout>
			<NavigationHeader 
				id={UnauthorizedScreenEnum.ForgotPassword} 
				title={t('common:screens.forgotPw')} 
				leftAction='back' 
			/>
			<ParagraphView>
				<StyledText>{t('common:auth.forgotPwDesc')}</StyledText>
			</ParagraphView>
			<KeyboardAvoidingScrollView
				awareView={renderAwareView()}
			>
				<TextInput
					testID='email'
					placeholder={t('common:auth.email')}
					inputStyle='text'
					value={loginFormData.email}
					onChangeText={(value) => setLoginFormData({
						...loginFormData,
						email: value
					})}
					onReset={(): void => setLoginFormData({
						...loginFormData,
						email: ''
					})}
				/>
				<TextInput
					testID='new-password'
					placeholder={t('common:accountDetails.newPw')}
					inputStyle='text'
					secureTextEntry
					value={loginFormData.pw}
					onChangeText={(value) => setLoginFormData({
						...loginFormData,
						pw: value
					})}
					onReset={(): void => setLoginFormData({
						...loginFormData,
						pw: ''
					})}
				/>
				<Condition condition={!isPwValid(loginFormData.pw ?? '') && submitPressed}>
					<ErrorMessage>
						{`${t('common:login.instructions1')}${t('common:login.instructions2')}`}
					</ErrorMessage>
				</Condition>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default ForgotPassword;