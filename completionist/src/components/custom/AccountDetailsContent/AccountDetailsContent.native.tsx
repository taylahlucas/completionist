import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import {
	SettingsDescription
} from '../Settings/SettingsStyledComponents.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import Condition from '@components/general/Condition.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';

const AccountDetailsContent = () => {
	const { t } = useTranslation();
	const { user } = useMainState();
	const [username, setUsername] = useState(user.name);
	// TODO: email and password validation
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const { saveUserAndLogin } = useEditUserData();

	// TODO: Change password 
	return (
		<>
			<KeyboardAvoidingScrollView>
				<ScrollableList>
					<SettingsDescription align='left'>
						{t('common:accountDetails.changeUsername')}
					</SettingsDescription>
					<TextInput
						placeholder={t('common:auth.username')}
						value={username}
						inputStyle='text'
						onChangeText={(value: string): void => setUsername(value)}
						onReset={(): void => setUsername('')}
					/>

					<SettingsDescription align='left'>
						{t('common:accountDetails.changeEmail')}
					</SettingsDescription>
					<TextInput
						placeholder={t('common:auth.email')}
						value={email}
						inputStyle='text'
						onChangeText={(value: string): void => setEmail(value)}
						onReset={(): void => setEmail('')}
					/>
					<Condition condition={!!user.password}>
						<SettingsDescription align='left'>
							{t('common:accountDetails.changePassword')}
						</SettingsDescription>
						<TextInput
							placeholder={t('common:auth.userpw')}
							value={password}
							secureTextEntry
							inputStyle='text'
							onChangeText={(value: string): void => setPassword(value)}
							onReset={(): void => setPassword('')}
						/>
					</Condition>
					<SettingsDescription align='left'>
						{t('common:accountDetails.changePassword')}
					</SettingsDescription>
					<TextInput
						placeholder={t('common:auth.userpw')}
						value={password}
						secureTextEntry
						inputStyle='text'
						onChangeText={(value: string): void => setPassword(value)}
						onReset={(): void => setPassword('')}
					/>
				</ScrollableList>
			</KeyboardAvoidingScrollView>
			<Button
				title={t('common:accountDetails.updateDetails')}
				type='footer'
				onPress={(): void => saveUserAndLogin({
					...user,
					name: username,
					// TODO: Email validation
					// email: email
				}, false)}
			/>
		</>
	);
};

export default AccountDetailsContent;