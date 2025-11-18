import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  useEditUserData,
  useRemoveUserData,
  checkUserExists,
  linkAndSignIn,
  signIn,
  signUp,
  SignInProps,
  updateUser,
  useVerifyUser,
} from '@data/index';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useLoginDispatch } from '../../provider';
import { log } from '@utils/helpers/index';
import { useSendVerificationEmail } from './';
import {
  UnAuthorizedScreenEnum,
  getUserLang,
  maxPwAttempts,
  requestCodes,
} from '@utils/index';

interface GoogleError {
  code: number;
  message: string;
}

interface GetLoginMethodsReturnType {
  checkUserAccount: ({ email, pw }: SignInProps) => Promise<void>;
  googleUserSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useGetLoginMethods = (): GetLoginMethodsReturnType => {
  const { t } = useTranslation();
  const { user, shouldUpdateUser } = useMainState();
  const { setSelectedGameDataSettings, setShowSplashScreen } =
    useMainDispatch();
  const { setLoggedIn, triggerIsSigningUp, setIsGoogleSignIn } =
    useLoginDispatch();
  const { saveUser } = useEditUserData();
  const { removeUserData } = useRemoveUserData();
  const sendVerification = useSendVerificationEmail();
  const handleUserVerification = useVerifyUser();

  const userSignIn = async ({ email, pw, googleId }: SignInProps) => {
    await signIn({ email, pw, googleId })
      .then(userResponse => {
        if (!!userResponse) {
          handleUserVerification(userResponse);
        }
      })
      .catch(error => {
        if (error?.response?.status === requestCodes.WRONG_PASSWORD) {
          const currentAttempts = user.account.pwAttempts;
          // TODO: Move this to BE & add to translations
          if (currentAttempts > maxPwAttempts) {
            Alert.alert(
              'Too many incorrect attempts. You have been temporarily locked out of your accout. Please try again later.',
            );
          } else {
            Alert.alert(
              `You have ${
                maxPwAttempts - (currentAttempts + 1)
              } password attemps left.`,
            );
          }
        }
      });
  };

  const linkGoogleAccount = ({ email, googleId }: SignInProps) => {
    Alert.alert(
      t('common:errors.accountExists'),
      t('common:errors.accountExistsMsg'),
      [
        {
          text: t('common:alerts.cta.ok'),
          // Update user with googleId
          onPress: () =>
            linkAndSignIn({
              email: email,
              googleId: googleId,
            }).then(userResponse => {
              if (!!userResponse) {
                saveUser(userResponse);
                setLoggedIn(true);
                if (userResponse.gameData) {
                  setSelectedGameDataSettings(userResponse.gameData[0]?.id);
                }
              }
            }),
        },
        {
          text: t('common:alerts.cta.cancel'),
        },
      ],
    );
  };

  const linkAccount = (email: string) => {
    Alert.alert(
      t('common:errors.accountExists'),
      t('common:errors.accountExistsMsg'),
      [
        {
          text: t('common:alerts.cta.ok'),
          // Update user with password
          onPress: (): Promise<void> =>
            sendVerification(
              email,
              t('common:auth.linkAccountDesc'),
              UnAuthorizedScreenEnum.LinkAccount,
            ),
        },
        {
          text: t('common:alerts.cta.cancel'),
        },
      ],
    );
  };

  const checkUserAccount = async ({ email, pw }: SignInProps) => {
    // Only runs on regular sign in
    checkUserExists(email).then(accounts => {
      if (accounts.regular) {
        userSignIn({
          email,
          pw,
        });
      } else if (accounts.google && !accounts.regular) {
        linkAccount(email);
      } else {
        Alert.alert(
          t('common:errors.emailNotFound'),
          t('common:errors.checkCredentials'),
        );
      }
    });
  };

  const googleUserSignIn = async () => {
    try {
      setShowSplashScreen(true);
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      if (idToken && user.email && user.id) {
        checkUserExists(user.email).then(accounts => {
          // If google account is not linked
          if (accounts.regular && !accounts.google) {
            linkGoogleAccount({ email: user.email, googleId: user.id });
          } else if (accounts.google) {
            userSignIn({
              email: user.email,
              googleId: user.id,
            });
          } else if (!accounts.google && !accounts.regular) {
            signUp({
              data: {
                userId: uuid.v4().toString(),
                username: '',
                email: user.email,
                googleId: user.id,
              },
              lang: getUserLang(),
            }).then(response => {
              if (!!response) {
                saveUser(response);
                setShowSplashScreen(false);
                triggerIsSigningUp(true);
                setIsGoogleSignIn(true);
              }
            });
          } else {
            Alert.alert(
              t('common:errors.googleSignIn'),
              t('common:errors.googleSignInMsg'),
            );
          }
        });
      }
    } catch (error: GoogleError | any) {
      setShowSplashScreen(false);
      log({
        type: 'error',
        title: 'Google Sign In',
        data: {
          code: error.code,
          message: error.message,
        },
      });
    }
  };

  const signOut = async () => {
    try {
      if (shouldUpdateUser) {
        updateUser(user).then(() => removeUserData());
      } else {
        removeUserData();
      }
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error: GoogleError | any) {
      log({
        type: 'error',
        title: 'Google Sign Out',
        data: {
          code: error.code,
          message: error.message,
        },
      });
    }
  };

  return {
    checkUserAccount,
    googleUserSignIn,
    signOut,
  };
};
