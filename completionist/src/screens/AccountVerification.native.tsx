import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import Button from '@components/general/Button/Button.native';
import VerificationEntry from '@components/general/VerificationEntry/VerificationEntry.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';
import StyledText from '@components/general/Text/StyledText.native';

const AccountVerification = () => {
	const { t } = useTranslation();
	const [isValid, setIsValid] = useState<boolean>(false);
	const { loginFormData, verificationToken } = useLoginState();
	const { createUser } = useGetLoginMethods();

	useEffect(() => {
		console.log("IS VALID: ", isValid)
	}, [isValid])

	// TODO: Re-do translations for instructions2 and verifyAccount
	return (
		<StandardLayout>
			<NavigationHeader title={t('common:screens.verifyAccount')} leftAction='none' />
			<StyledText>{t('common:login.accountVerification')}</StyledText>
			<VerificationEntry token={verificationToken ?? ''} setIsValid={setIsValid} />
			<Button
				title={t('common:continue')}
				disabled={!isValid}
				onPress={(): void => {
					createUser(loginFormData);
				}}
			/>
		</StandardLayout>
	);
};

export default AccountVerification;