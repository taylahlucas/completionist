import React, { useState } from 'react';
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
	value: string;
	setValue: (value: string) => void;
	action: () => void;
}

const VerificationContent = ({ email, token, value = '', setValue, action }: VerificationContentProps) => {
	const { t } = useTranslation();
	const sendVerificationEmail = useSendVerificationEmail();

	const renderAwareView = (): JSX.Element => {
		return (
			<Button
				title={t('common:continue')}
				type='footer'
				disabled={value.length !== token?.length}
				onPress={action}
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
						onPress={(): Promise<void> => sendVerificationEmail(email, true)}
					/>
				</ParagraphView>
			</KeyboardAvoidingScrollView>
		</>
	);
};

export default VerificationContent;