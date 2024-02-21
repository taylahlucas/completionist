import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';

const AccountDetailsContent = () => {
	const { t }  = useTranslation();
	const { user } = useMainState();
	const [username, setUsername] = useState(user.name);
	// TODO: email and password validation
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const { saveUserAndCache } = useEditUserData();
	
	// TODO: Change password
	return (
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
						placeholder={t('common:auth.password')}
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
				onPress={(): void => saveUserAndCache({
					...user,
					name: username,
					// TODO: Email validation
					// email: email
				})}
			/>
		</ScrollableList>
	);
};

export default AccountDetailsContent;