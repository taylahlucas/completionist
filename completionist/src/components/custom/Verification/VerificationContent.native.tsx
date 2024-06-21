import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@components/general/Button/Button.native';
import VerificationEntry from '@components/general/VerificationEntry/VerificationEntry.native';
import StyledText from '@components/general/Text/StyledText.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import ParagraphView from '@components/general/ParagraphView.native';
import Spacing from '@components/general/Spacing.native';
import useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';

interface VerificationContentProps {
	email: string;
	token: string;
	action: () => void | Promise<void>;
}

const VerificationContent = ({ email, token, action }: VerificationContentProps) => {
	const { t } = useTranslation();
	const [value, setValue] = useState<string>('');
	const sendVerification = useSendVerificationEmail();

	const renderAwareView = (): JSX.Element => {
		return (
			<Button
				title={t('common:continue')}
				type='footer'
				disabled={value.length !== token?.length}
				onPress={(): void => {
					if (value === token) {
						action();
					}
					else {
						Alert.alert(
							t('common:errors.incorrectCode'),
							t('common:errors.incorrectCodeDesc'),
						);
					}
				}}
			/>
		);
	};

	return (
		<>
			<ParagraphView>
				<StyledText>{t('common:login.accountVerification')}</StyledText>
			</ParagraphView>
			<KeyboardAvoidingScrollView awareView={renderAwareView()}>
				<VerificationEntry
					length={token?.length ?? 0}
					value={value}
					setValue={setValue}
				/>
				<Spacing />
				<ParagraphView>
					<Button
						title={t('common:login.resendToken')}
						type='text'
						onPress={(): void => {
							sendVerification(
								email, 
								'common:sendRequest.verifyAccount'
							);
							Alert.alert('common:login.tokenResent')
						}}
					/>
				</ParagraphView>
			</KeyboardAvoidingScrollView>
		</>
	);
};

export default VerificationContent;