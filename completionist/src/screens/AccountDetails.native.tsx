import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import {
	SettingsDescription,
	AccountDetailsFieldTitle
} from '@components/custom/Settings/SettingsStyledComponents.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import Condition from '@components/general/Condition.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import ErrorMessage from '@components/general/Text/ErrorMessage.native';
import useValidator from '@utils/hooks/useValidator';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import StyledText from '@components/general/Text/StyledText.native';

interface ChangeAccountDetailsItem {
	value: string;
	changed: boolean;
}

interface ChangeAccountDetails {
	name: ChangeAccountDetailsItem;
	email: ChangeAccountDetailsItem;
	pw: ChangeAccountDetailsItem;
}

const AccountDetails = () => {
	const { t } = useTranslation();
	const { user } = useMainState();
	const { isEmailValid, isPwValid, isNameValid } = useValidator();
	const [userInfo, setUserInfo] = useState<ChangeAccountDetails>({
		name: { value: user.name, changed: false },
		email: { value: user.email, changed: false },
		pw: { value: user.password ?? '', changed: false },
	});
	const { updateUserData } = useEditUserData();
	const { checkUserExists } = useEndpoints();
	const [submitPressed, setSubmitPressed] = useState<boolean>(false);

	useEffect(() => {
		setSubmitPressed(false);
	}, [userInfo])

	const renderAwareView = () => (
		<Button
			title={t('common:accountDetails.updateDetails')}
			type='footer'
			disabled={!userInfo.name.changed && !userInfo.email.changed && !userInfo.pw.changed}
			onPress={(): void => {
				setSubmitPressed(true);

				if (userInfo.email.changed && isEmailValid(userInfo.email.value)) {
					checkUserExists(userInfo.email.value)
						.then((accounts) => {
							setSubmitPressed(false);
							if (!accounts.regular && !accounts.google) {
								updateUserData({
									...user,
									name: userInfo.name.changed ? userInfo.name.value : user.name,
									email: userInfo.email.value
								});
								Alert.alert('User successfully updated.')
							}
							else if (accounts.regular && accounts.google) {
								Alert.alert(
									'Email already exists',
									'Please use a different email address.'
								);
							}
							else if (!accounts.regular && accounts.google) {
								Alert.alert(
									'Email already exists',
									'This email is already linked through Google. If you would like to sign in with a regular password, login with this email and set your desired password.'
								);
							}
							else if (!accounts.google && accounts.regular) {
								Alert.alert(
									'Email already exists',
									'This email is already linked. If you would like to link your Google account, login through the Google Sign In using this email.'
								);
							}
						})
				}
			}}
		/>
	);
	// TODO: Add to translations
	return (
		<StandardLayout>
			<NavigationHeader id={AuthScreenEnum.AccountDetails} title={t('common:screens.accountDetails')} leftAction='back' />
			<>
				<KeyboardAvoidingScrollView
					awareView={renderAwareView()}
				>
					<AccountDetailsFieldTitle align='left'>
						{t('common:accountDetails.changeUsername')}
					</AccountDetailsFieldTitle>
					<TextInput
						placeholder={t('common:auth.username')}
						value={userInfo.name.value}
						inputStyle='text'
						onChangeText={(value: string): void => setUserInfo({
							...userInfo,
							name: { value: value, changed: value !== user.name }
						})}
						onReset={(): void => setUserInfo({
							...userInfo,
							name: { value: '', changed: true }
						})}
					/>
					<Condition condition={!isNameValid(userInfo.name.value) && userInfo.name.changed && submitPressed}>
						<ErrorMessage>Please ensure name has at least 1 character.</ErrorMessage>
					</Condition>

					<AccountDetailsFieldTitle align='left'>
						{t('common:accountDetails.changeEmail')}
					</AccountDetailsFieldTitle>
					<TextInput
						placeholder={t('common:auth.email')}
						value={userInfo.email.value.toLowerCase()}
						inputStyle='text'
						onChangeText={(value: string): void => setUserInfo({
							...userInfo,
							email: { value: value, changed: value !== user.email }
						})}
						onReset={(): void => setUserInfo({
							...userInfo,
							email: { value: '', changed: true }
						})}
					/>
					<Condition condition={!isEmailValid(userInfo.email.value) && userInfo.email.changed && submitPressed}>
						<ErrorMessage>Please ensure you are using a valid email.</ErrorMessage>
					</Condition>

					{/* // TODO: What happens when it is only a google account? */}
					<StyledText align='left' style={{ width: '100%', paddingTop: 18, paddingBottom: 8 }} type='ListItemTitleBold'>
						{t('common:accountDetails.changePassword')}
					</StyledText>
					<TextInput
						placeholder='Current Password'
						value={userInfo.pw.value}
						secureTextEntry
						inputStyle='text'
						onChangeText={(value: string): void => setUserInfo({
							...userInfo,
							pw: { value: value, changed: value !== user.password }
						})}
						onReset={(): void => setUserInfo({
							...userInfo,
							pw: { value: '', changed: false }
						})}
					/>
					<TextInput
						placeholder='New Password'
						value={userInfo.pw.value}
						secureTextEntry
						inputStyle='text'
						onChangeText={(value: string): void => setUserInfo({
							...userInfo,
							pw: { value: value, changed: value !== user.password }
						})}
						onReset={(): void => setUserInfo({
							...userInfo,
							pw: { value: '', changed: false }
						})}
					/>
					<Condition condition={!isPwValid(userInfo.pw.value) && submitPressed && userInfo.pw.changed}>
						<ErrorMessage>Please ensure password has at least:</ErrorMessage>
					</Condition>
				</KeyboardAvoidingScrollView>
			</>
		</StandardLayout>
	);
};

export default AccountDetails;