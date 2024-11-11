import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import TextInput from '@components/general/TextInput/TextInput.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import Button from '@components/general/Button/Button.native';
import StyledText from '@components/general/Text/StyledText.native';
import useSignupFlow from './hooks/useSignupFlow';
import Spacing from '@components/general/Spacing.native';

const SetUsername = () => {
	const { t } = useTranslation();
	const { viewModel, actions } = useSignupFlow();

	const renderAwareView = () => (
		<Button
			title={t('common:continue')}
			type='footer'
			disabled={viewModel.username.length === 0}
			onPress={async (): Promise<void> => {
				if (viewModel.username.length > 0) {
					const updatedUser = {
						...viewModel.user,
						username: viewModel.username,
						signup: {
							...viewModel.user.signup,
							setUsername: true
						}
					}
					actions.updateUserData(updatedUser);
				}
			}}
		/>
	);
	// TODO: Add to translations
	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.SetUsername} title={'Set Username'} leftAction='none' />
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<StyledText>This username will be publicly linked to your profile.</StyledText>
				<Spacing />
				<TextInput
					testID='username'
					placeholder={t('common:auth.username')}
					value={viewModel.username}
					onChangeText={(value) => actions.setUsername(value)}
					onReset={(): void => actions.setUsername('')}
				/>
			</KeyboardAvoidingScrollView>
		</StandardLayout>
	);
};

export default SetUsername;