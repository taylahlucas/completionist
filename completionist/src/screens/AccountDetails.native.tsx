import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import {
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
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

interface ChangeAccountDetailsItem {
	value: string;
	changed: boolean;
}

interface ChangeAccountDetails {
	name: ChangeAccountDetailsItem;
	email: ChangeAccountDetailsItem;
	currentPw: ChangeAccountDetailsItem;
	newPw: ChangeAccountDetailsItem;
}

const AccountDetails = () => {
	const navigation = useReactNavigation();
	const { t } = useTranslation();
	const { user, currentScreen } = useMainState();
	const { isEmailValid, isPwValid, isNameValid } = useValidator();
	const initialState = {
		name: { value: user.name, changed: false },
		email: { value: user.email, changed: false },
		currentPw: { value: '', changed: false },
		newPw: { value: '', changed: false },
	};
	const [userInfo, setUserInfo] = useState<ChangeAccountDetails>(initialState);
	const { saveUser } = useEditUserData();
	const { updateUser, changePw } = useEndpoints();
	const { checkUserExists } = useAuthEndpoints();
	const [showChangePw, setShowChangePw] = useState<boolean>(false);
	const [submitPressed, setSubmitPressed] = useState<boolean>(false);

	// TODO: Refactor
	const resetState = () => {
		setUserInfo(initialState);
		setSubmitPressed(false)
	};

	useEffect(() => {
		checkUserExists(user.email)
			.then((accounts) => 
				setShowChangePw(accounts.google && !accounts.regular ? false : true)
			);
	}, [])
	
	useEffect(() => {
		// Reset state
		if (currentScreen === AuthScreenEnum.Settings) {
			resetState();
		}
	}, [currentScreen])

	// TODO: Add navigation.goBack after alert
	const onSubmit = () => {
		setSubmitPressed(true);
		if (userInfo.email.changed && isEmailValid(userInfo.email.value)) {
			checkUserExists(userInfo.email.value)
				.then((accounts) => {
					if (!accounts.regular && !accounts.google) {
						let updatedUser = {
							...user,
							name: userInfo.name.changed ? userInfo.name.value : user.name,
							email: userInfo.email.value
						}
						updateUser(updatedUser).then(() => {
							saveUser(updatedUser);
							Alert.alert(t('common:alerts.updateSuccess'));
							resetState();							navigation.goBack();
						})
					}
					else if (accounts.regular && accounts.google) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.differentEmail'),
						);
					}
					else if (!accounts.regular && accounts.google) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.linkedWithGoogle')
						);
					}
					else if (!accounts.google && accounts.regular) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.linkedWithRegular')
						);
					}
				})
		}
		else if (userInfo.name.changed && isNameValid(userInfo.name.value)) {
			updateUser({
				...user,
				name: userInfo.name.value
			})
				.then(() => {
					saveUser({
						...user,
						name: userInfo.name.value
					});
					Alert.alert(t('common:alerts.updateSuccess'));
					resetState();
				})
		}
		else if (userInfo.newPw.changed && isPwValid(userInfo.newPw.value)) {
			changePw({
				userId: user.userId,
				oldPw: userInfo.currentPw.value,
				newPw: userInfo.newPw.value
			})
				.then(() => {
					Alert.alert('User successfully updated.')
					resetState();
				});
		}
	};

	return (
		<StandardLayout>
			<NavigationHeader
				id={AuthScreenEnum.AccountDetails} 
				title={t('common:screens.accountDetails')} 
				isForm={userInfo.name.changed || userInfo.email.changed}
				leftAction='back'
			/>
			<>
				<KeyboardAvoidingScrollView
					awareView={
						<Button
							title={t('common:accountDetails.updateDetails')}
							type='footer'
							disabled={
								!userInfo.name.changed
								&& !userInfo.email.changed
								&& !userInfo.newPw.changed
								&& (!isNameValid(userInfo.name.value) 
									|| !isEmailValid(userInfo.email.value) 
									|| !isPwValid(userInfo.newPw.value)
								)
							}
							onPress={(): void => onSubmit()}
						/>
					}
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
						<ErrorMessage>
							{t('common:accountDetails.invalidUsername')}
							</ErrorMessage>
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
						<ErrorMessage>
							{t('common:accountDetails.invalidEmail')}
						</ErrorMessage>
					</Condition>
					
					<Condition condition={showChangePw}>
						<StyledText align='left' style={{ width: '100%', paddingTop: 18, paddingBottom: 8 }} type='ListItemTitleBold'>
							{t('common:accountDetails.changePw')}
						</StyledText>
						<TextInput
							placeholder={t('common:accountDetails.currentPw')}
							value={userInfo.currentPw.value}
							secureTextEntry
							inputStyle='text'
							onChangeText={(value: string): void => setUserInfo({
								...userInfo,
								currentPw: { value: value, changed: value !== user.pw }
							})}
							onReset={(): void => setUserInfo({
								...userInfo,
								currentPw: { value: '', changed: false }
							})}
						/>
						<TextInput
							placeholder={t('common:accountDetails.newPw')}
							value={userInfo.newPw.value}
							secureTextEntry
							inputStyle='text'
							onChangeText={(value: string): void => setUserInfo({
								...userInfo,
								newPw: { value: value, changed: value !== user.pw }
							})}
							onReset={(): void => setUserInfo({
								...userInfo,
								newPw: { value: '', changed: false }
							})}
						/>

						<Condition condition={!isPwValid(userInfo.newPw.value) && userInfo.newPw.changed && submitPressed}>
							<ErrorMessage>{`${t('common:login.instructions1')}${t('common:login.instructions2')}`}</ErrorMessage>
						</Condition>
					</Condition>
				</KeyboardAvoidingScrollView>
			</>
		</StandardLayout>
	);
};

export default AccountDetails;