import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEditUserData, useVerifyUser } from '@data/index';
import {
  checkUserExists,
  linkAndSignIn,
  signIn,
  signUp,
  SignInProps,
  updateUser,
} from '@api/';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { log } from '@utils/helpers/index';
import { useSendVerificationEmail } from './';
import {
  UnAuthorizedScreenEnum,
  getUserLang,
  maxPwAttempts,
  requestCodes,
} from '@utils/index';
import { resetStore } from '@redux/index';
import { useAuthDispatch, useAuthState } from '@redux/auth';

interface GoogleError {
  code: number;
  message: string;
}

interface GetLoginMethodsReturnType {
  userSignIn: ({ email, pw, googleId }: SignInProps) => Promise<void>;
  linkAccount: (email: string) => void;
  checkUserAccount: ({ email, pw }: SignInProps) => Promise<void>;
  googleUserSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useGetLoginMethods = (
  triggerIsSigningUp?: (value: boolean) => void,
): GetLoginMethodsReturnType => {
  const { t } = useTranslation();
  const { shouldUpdateUser } = useMainState();
  const { setSelectedGameDataSettings, setShowSplashScreen } =
    useMainDispatch();
  const { user } = useAuthState();
  const { setIsGoogleSignIn } = useAuthDispatch();
  const { saveUser } = useEditUserData();
  const sendVerification = useSendVerificationEmail();
  const handleUserVerification = useVerifyUser();

  const userSignIn = async ({ email, pw, googleId }: SignInProps) => {
    await signIn({ email, pw, googleId })
      .then(userResponse => {
        if (userResponse) {
          handleUserVerification(userResponse);
        }
      })
      .catch(error => {
        if (error?.response?.status === requestCodes.WRONG_PASSWORD) {
          const currentAttempts = user?.account.pwAttempts ?? 0;
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
              if (userResponse) {
                saveUser(userResponse);
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

  const linkAccount = (email: string): void => {
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

  const checkUserAccount = async ({ account, email, pw }: SignInProps) => {
    // Only runs on regular sign in
    if (account?.regular) {
      userSignIn({
        email,
        pw,
      });
    } else if (account?.google && !account?.regular) {
      linkAccount(email);
    } else {
      Alert.alert(
        t('common:errors.emailNotFound'),
        t('common:errors.checkCredentials'),
      );
    }
  };

  const googleUserSignIn = async () => {
    try {
      setShowSplashScreen(true);
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      if (idToken && user.email && user.id) {
        checkUserExists(user.email).then(accounts => {
          console.log('accounts: ', accounts);
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
              if (response) {
                saveUser(response);
                setShowSplashScreen(false);
                triggerIsSigningUp?.(true);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      if (shouldUpdateUser && user) {
        updateUser(user).then(resetStore);
      } else {
        resetStore();
      }
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error: GoogleError | unknown) {
      log({
        type: 'error',
        title: 'Google Sign Out',
        data: {
          code: (error as GoogleError)?.code,
          message: (error as GoogleError)?.message,
        },
      });
    }
  };

  return {
    userSignIn,
    linkAccount,
    checkUserAccount,
    googleUserSignIn,
    signOut,
  };
};
