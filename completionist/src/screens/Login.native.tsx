import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import { LoginContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import Condition from '@components/general/Condition.native';
import StyledText from '@components/general/Text/StyledText.native';
import LoginForm from '@components/custom/LoginForm/LoginForm.native';
import LoginFormSignInButtons from '@components/custom/LoginForm/LoginFormSignInButtons.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';

const Login = () => {
	const { t } = useTranslation();
	const { isSigningUp } = useLoginState();

	// TODO: Fix keyboard view here (check with actual phone)
	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.Login} title={t('common:appTitle')} leftAction={'none'} />
			<ScrollView>
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
				</LoginContentContainer>
				<LoginFormSignInButtons />
			</ScrollView>
		</StandardLayout>
	);
};

export default Login;