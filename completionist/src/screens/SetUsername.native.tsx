import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import TextInput from '@components/general/TextInput/TextInput.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import StyledText from '@components/general/Text/StyledText.native';

const SetUsername = () => {
	const { t } = useTranslation();
	const { user } = useMainState();
	const [username, setUsername] = useState<string>('');
	const { updateUserData } = useEditUserData();

	const renderAwareView = () => (
		<Button
			title={t('common:continue')}
			type='footer'
			disabled={username.length === 0}
			onPress={async (): Promise<void> => {
				if (username.length > 0) {
					const updatedUser = {
						...user,
						username,
						signup: {
							...user.signup,
							setUsername: true
						}
					}
					updateUserData(updatedUser);
				}
			}}
		/>
	);

	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.SetUsername} title={'Set Username'} leftAction='none' />
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<StyledText>This username will be publicly linked to your profile.</StyledText>
				<TextInput
					testID='username'
					placeholder={t('common:auth.username')}
					value={username}
					onChangeText={(value) => setUsername(value)}
					onReset={(): void => setUsername('')}
				/>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default SetUsername;