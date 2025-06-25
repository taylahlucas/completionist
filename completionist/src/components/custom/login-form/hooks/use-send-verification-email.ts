import { useTranslation } from 'react-i18next';
import { sendVerificationEmail } from '@data/api/auth-endpoints';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/use-react-navigation';
import { useLoginDispatch } from '../provider';

export const useSendVerificationEmail = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
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

  const sendVerification = async (
    email: string,
    text: string,
    navigateTo?: UnauthorizedScreenEnum,
  ) => {
    const uniqueCode = generateVerificationToken(6);
    console.log('uniqueCode: ', uniqueCode);
    setVerificationToken(uniqueCode);

    sendVerificationEmail({
      emailTo: email,
      subject: t('common:screens.verifyAccount'),
      text: t(text, {
        code: uniqueCode,
      }),
    });
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return sendVerification;
};
