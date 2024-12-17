import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { useEditUserData, useRemoveUserData } from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';
import { SignInProps } from '@data/api/EndpointInterfaces.native';
import useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';
import useLoginDispatch from '../provider/useLoginDispatch';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { useLogger } from '@utils/hooks/index';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface GoogleError {
  code: number;
  message: string;
}

interface GetLoginMethodsReturnType {
  checkUserAccount: ({ email, pw }: SignInProps) => Promise<void>;
  googleUserSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
  const { t } = useTranslation();
  const { log } = useLogger();
  const { user, shouldUpdateUser } = useMainState();
  const { setSelectedGameSettings } = useMainDispatch();
  const { setLoggedIn, triggerIsSigningUp, setIsGoogleSignIn } =
    useLoginDispatch();
  const { saveUser } = useEditUserData();
  const { removeUserData } = useRemoveUserData();
  const { checkUserExists, linkAndSignIn, signIn, signUp } = useAuthEndpoints();
  const { updateUser } = useEndpoints();
  const sendVerification = useSendVerificationEmail();

  const userSignIn = async ({ email, pw, googleId }: SignInProps) => {
    await signIn({ email, pw, googleId }).then(userResponse => {
      if (!!userResponse) {
        saveUser(userResponse);
        setLoggedIn(true);
        if (userResponse.gameData) {
          setSelectedGameSettings(userResponse.gameData[0]?.id);
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
                  setSelectedGameSettings(userResponse.gameData[0]?.id);
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
              UnauthorizedScreenEnum.LinkAccount,
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
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth()
        .signInWithCredential(googleCredential)
        .then((response): void => {
          const { uid, email } = response?.user || {};
          if (email && idToken && uid) {
            checkUserExists(email).then(accounts => {
              // If google account not linked
              if (accounts.regular && !accounts.google) {
                linkGoogleAccount({ email: email, googleId: uid });
              } else if (accounts.google) {
                userSignIn({
                  email: email,
                  googleId: uid,
                });
              } else if (!accounts.google && !accounts.regular) {
                signUp({
                  data: {
                    userId: uuid.v4().toString(),
                    username: '',
                    email: email,
                    googleId: uid,
                  },
                }).then(response => {
                  if (!!response) {
                    saveUser(response);
                    triggerIsSigningUp(true);
                    setIsGoogleSignIn(true);
                  }
                });
              }
            });
          } else {
            Alert.alert(
              t('common:errors.googleSignIn'),
              t('common:errors.googleSignInMsg'),
            );
          }
        });
    } catch (error: GoogleError | any) {
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

export default useGetLoginMethods;
