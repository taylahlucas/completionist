import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import Button from '@components/general/Button/Button.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import {Condition, ParagraphView} from '@components/general/index';
import ErrorMessage from '@components/general/Text/ErrorMessage.native';
import useLogin from './hooks/useLogin';

const ForgotPassword = () => {
	const { t } = useTranslation();
	const { viewModel, actions } = useLogin();

	const renderAwareView = () => (
		<Button
			testID='forgot-password'
			type='footer'
			title={t('common:continue')}
			disabled={!viewModel.loginFormData.email || !viewModel.loginFormData.pw}
			onPress={actions.forgotPw.onSubmit}
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
					value={viewModel.loginFormData.email}
					onChangeText={(value) => actions.forgotPw.setLoginFormData({
						...viewModel.loginFormData,
						email: value
					})}
					onReset={(): void => actions.forgotPw.setLoginFormData({
						...viewModel.loginFormData,
						email: ''
					})}
				/>
				<TextInput
					testID='new-password'
					placeholder={t('common:accountDetails.newPw')}
					inputStyle='text'
					secureTextEntry
					value={viewModel.loginFormData.pw}
					onChangeText={(value) => actions.forgotPw.setLoginFormData({
						...viewModel.loginFormData,
						pw: value
					})}
					onReset={(): void => actions.forgotPw.setLoginFormData({
						...viewModel.loginFormData,
						pw: ''
					})}
				/>
				<Condition condition={viewModel.forgotPw.isInvalid}>
					<ErrorMessage>
						{`${t('common:login.instructions1')}${t('common:login.instructions2')}`}
					</ErrorMessage>
				</Condition>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default ForgotPassword;