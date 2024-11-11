import { useTranslation } from 'react-i18next';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useLoginDispatch from './useLoginDispatch';

const useSendVerificationEmail = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { sendVerificationEmail } = useAuthEndpoints();
	const { setVerificationToken } = useLoginDispatch();

	const generateVerificationToken = (length: number): string => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let code = '';

		for (let i = 0; i < 6; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			code += characters.charAt(randomIndex);
		}

		return code;
	};

	const sendVerification = async (email: string, text: string, navigateTo?: UnauthorizedScreenEnum) => {
		const uniqueCode = generateVerificationToken(6);
		console.log("uniqueCode: ", uniqueCode);
		setVerificationToken(uniqueCode);

		sendVerificationEmail({
			emailTo: email,
			subject: t('common:screens.verifyAccount'),
			text: t(
				text,
				{
					code: uniqueCode
				}
			)
		});
		if (navigateTo) {
			navigation.navigate(navigateTo);
		}
	};

	return sendVerification;
};

export default useSendVerificationEmail;