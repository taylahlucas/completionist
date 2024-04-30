import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import {
	SettingsContentDescription,
	SettingsContentInputContainer
} from '../SettingsContent/SettingsContentStyledComponents.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import Condition from '@components/general/Condition.native';

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
		<KeyboardAvoidingView 
			style={{ flex: 1, alignItems: 'center' }}
			behavior="height"
			keyboardVerticalOffset={10}>
		<ScrollableList>
				<SettingsContentDescription align='left'>
					{t('common:accountDetails.changeUsername')}
				</SettingsContentDescription>
				<SettingsContentInputContainer>
					<TextInput
						placeholder={t('common:auth.username')}
						value={username}
						inputStyle='text'
						onChangeText={(value: string): void => setUsername(value)}
						onReset={(): void => setUsername('')}
					/>
				</SettingsContentInputContainer>

				<SettingsContentDescription align='left'>
					{t('common:accountDetails.changeEmail')}
				</SettingsContentDescription>
				<SettingsContentInputContainer>
					<TextInput
						placeholder={t('common:auth.email')}
						value={email}
						inputStyle='text'
						onChangeText={(value: string): void => setEmail(value)}
						onReset={(): void => setEmail('')}
					/>
				</SettingsContentInputContainer>
				<Condition condition={!!user.password}>
					<SettingsContentDescription align='left'>
						{t('common:accountDetails.changePassword')}
					</SettingsContentDescription>
					<SettingsContentInputContainer>
						<TextInput
							placeholder={t('common:auth.userpw')}
							value={password}
							secureTextEntry
							inputStyle='text'
							onChangeText={(value: string): void => setPassword(value)}
							onReset={(): void => setPassword('')}
						/>
					</SettingsContentInputContainer>
				</Condition>
				<Button
					title={t('common:accountDetails.updateDetails')}
					onPress={(): void => saveUserAndLogin({
						...user,
						name: username,
						// TODO: Email validation
						// email: email
					}, false)}
				/>
		</ScrollableList>
		</KeyboardAvoidingView>
	);
};

export default AccountDetailsContent;