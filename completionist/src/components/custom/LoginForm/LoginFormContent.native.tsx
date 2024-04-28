import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import LoginForm from './LoginForm.native';
import LoginFormSignInButtons from './LoginFormSignInButtons.native';
import { LoginContentContainer } from './LoginFormStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useLoginState from './hooks/useLoginState';
import Condition from '@components/general/Condition.native';

const LoginFormContent = () => {
	const { t } = useTranslation();
	const { isSigningUp } = useLoginState();

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<LoginContentContainer>
				<Condition condition={isSigningUp}>
					<StyledText style={{ position: 'absolute' }}>
						{t('common:login.instructions1')}
					</StyledText>
					<StyledText align='left' style={{ position: 'absolute' }}>
						{t('common:login.instructions2')}
					</StyledText>
				</Condition>
				<LoginForm />
				<LoginFormSignInButtons />
			</LoginContentContainer>
		</ScrollView>
	)
};

export default LoginFormContent;