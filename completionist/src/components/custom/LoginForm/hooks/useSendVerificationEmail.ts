import { useTranslation } from 'react-i18next';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useLoginDispatch from './useLoginDispatch';

const useSendVerificationEmail = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { sendEmail } = useEndpoints();
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

	const sendVerificationEmail = async (email: string, linkAccount: boolean = false) => {
		const uniqueCode = generateVerificationToken(6);
		console.log("uniqueCode: ", uniqueCode);
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
		});
		navigation.navigate(linkAccount 
			? UnauthorizedScreenEnum.LinkAccount
			: UnauthorizedScreenEnum.AccountVerification
		);
	};

	return sendVerificationEmail;
};

export default useSendVerificationEmail;