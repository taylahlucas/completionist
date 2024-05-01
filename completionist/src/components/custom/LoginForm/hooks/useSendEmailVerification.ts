import { useTranslation } from 'react-i18next';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import useEndpoints from '@data/api/hooks/useEndpoints.native';

const useSendEmailVerification = () => {
	const { t } = useTranslation();
	const { sendEmail } = useEndpoints();

	const sendEmailVerification = async (email: string, setVerificationToken: (token: string) => void) => {
		try {
			// TODO: Algorithm to generate unique code
			const uniqueCode = 'ANC234';
			setVerificationToken(uniqueCode);
			sendEmail({
				// TODO: Swap for completionist email
				emailTo: email,
				subject: t('common:screens.verifyAccount'),
				text: t(
					'common:sendRequest.verifyAccount',
					{
						code: uniqueCode
					}
				)
			})
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error sending verification email ", error.message)
		}
	};

	return sendEmailVerification;
};

export default useSendEmailVerification;