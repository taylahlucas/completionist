import React from 'react';
import { ScrollView } from 'react-native';
import LoginForm from './LoginForm.native';
import LoginFormSignInButtons from './LoginFormSignInButtons.native';
import { LoginContentContainer } from './LoginFormStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useLoginState from './hooks/useLoginState';
import Condition from '@components/general/Condition.native';

const LoginFormContent = () => {
	const { isSigningUp } = useLoginState();

	// TODO: Add to translations
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <LoginContentContainer>
				<Condition condition={isSigningUp}>
					<StyledText style={{ position: 'absolute' }}>
						Password must contain at least:
					</StyledText>
					<StyledText align='left' style={{ position: 'absolute' }}>
						{'\n\u2022 Minimum 8 values \n\u2022 1 uppercase letter\n\u2022 1 lowercase letter\n\u2022 1 numerical value'}
					</StyledText>
				</Condition>
        <LoginForm />
        <LoginFormSignInButtons />
      </LoginContentContainer>
    </ScrollView>
  )
};

export default LoginFormContent;