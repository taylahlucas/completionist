import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import VerificationContent from '@components/custom/Verification/VerificationContent.native';
import useAccountDetails from './hooks/useAccountDetails';

const VerifyNewPassword = () => {
	const { t } = useTranslation();
	const { viewModel, actions } = useAccountDetails();

	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.VerifyNewPassword} title={t('common:screens.verifyNewPw')} leftAction='back' />
			<VerificationContent
				email={viewModel.loginFormData.email}
				token={viewModel.verificationToken ?? ''}
				action={actions.forgotPassword}
			/>
		</StandardLayout>
	);
};

export default VerifyNewPassword;