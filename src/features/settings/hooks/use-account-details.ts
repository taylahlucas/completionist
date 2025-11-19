import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEditUserData } from '@data/hooks';
import { useReactNavigation } from '@navigation/hooks';
import { DrawerScreenEnum } from '@utils/index';
import { isEmailValid, isPwValid, isNameValid } from '@utils/helpers/index';
import { updateUser, changePw, checkUserExists } from '@data/index';
import { useAuthState, useAuthUser } from '@redux/auth';

export interface ChangeAccountDetailsItem {
  value: string;
  changed: boolean;
}

interface ChangeAccountDetails {
  username: ChangeAccountDetailsItem;
  email: ChangeAccountDetailsItem;
  currentPw: ChangeAccountDetailsItem;
  newPw: ChangeAccountDetailsItem;
}

export const useAccountDetails = () => {
  const navigation = useReactNavigation();
  const { t } = useTranslation();
  const { currentScreen } = useAuthState();
  const user = useAuthUser();
  const initialState = {
    username: { value: user?.username ?? '', changed: false },
    email: { value: user?.email ?? '', changed: false },
    currentPw: { value: '', changed: false },
    newPw: { value: '', changed: false },
  };
  const [userInfo, setUserInfo] = useState<ChangeAccountDetails>(initialState);
  const { saveUser } = useEditUserData();
  const [showChangePw, setShowChangePw] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      checkUserExists(user.email).then(accounts =>
        setShowChangePw(accounts.google && !accounts.regular ? false : true),
      );
    }
  }, []);

  useEffect(() => {
    if (currentScreen === DrawerScreenEnum.GameSettings) {
      resetState();
    }
  }, [currentScreen]);

  const resetState = () => {
    setUserInfo(initialState);
    setSubmitPressed(false);
  };

  const successAlert = () => {
    Alert.alert(t('common:alerts.updateSuccess'), '', [
      {
        text: t('common:alerts.cta.ok'),
        onPress: (): void => navigation.goBack(),
      },
    ]);
  };

  const onSubmit = (): void => {
    setSubmitPressed(true);
    // TODO: I don't think this would handle if I change multiple values at the same time?
    // TODO: Want to do verification check for changed email
    if (user) {
      if (userInfo.email.changed && isEmailValid(userInfo.email.value)) {
        checkUserExists(userInfo.email.value).then(accounts => {
          if (!accounts.regular && !accounts.google) {
            const updatedUser = {
              ...user,
              name: userInfo.username.changed
                ? userInfo.username.value
                : user.username,
              email: userInfo.email.value,
            };
            updateUser(updatedUser).then(() => {
              saveUser(updatedUser);
              Alert.alert(t('common:alerts.updateSuccess'));
              setSubmitPressed(false);
              navigation.goBack();
            });
          } else if (accounts.regular && accounts.google) {
            Alert.alert(
              t('common:errors.emailAlreadyExists'),
              t('common:errors.differentEmail'),
            );
          } else if (!accounts.regular && accounts.google) {
            Alert.alert(
              t('common:errors.emailAlreadyExists'),
              t('common:errors.linkedWithGoogle'),
            );
          } else if (!accounts.google && accounts.regular) {
            Alert.alert(
              t('common:errors.emailAlreadyExists'),
              t('common:errors.linkedWithRegular'),
            );
          }
        });
      } else if (
        userInfo.username.changed &&
        isNameValid(userInfo.username.value)
      ) {
        updateUser({
          ...user,
          username: userInfo.username.value,
        }).then(() => {
          saveUser({
            ...user,
            username: userInfo.username.value,
          });
          successAlert();
        });
      } else if (userInfo.newPw.changed && isPwValid(userInfo.newPw.value)) {
        changePw({
          userId: user.userId,
          oldPw: userInfo.currentPw.value,
          newPw: userInfo.newPw.value,
        }).then(response => {
          if (response) {
            successAlert();
          }
        });
      }
    }
  };

  return {
    viewModel: {
      user: {
        username: user?.username,
        email: user?.email,
        pw: user?.pw,
      },
      userInfo,
      hasChanged: userInfo.email.changed || userInfo.username.changed,
      isNameValid:
        !isNameValid(userInfo.username.value) &&
        userInfo.username.changed &&
        submitPressed,
      isEmailValid:
        !isEmailValid(userInfo.email.value) &&
        userInfo.email.changed &&
        submitPressed,
      isPwValid:
        !isPwValid(userInfo.newPw.value) &&
        userInfo.newPw.changed &&
        submitPressed,
      showChangePw,
      submitDisabled:
        !userInfo.username.changed &&
        !userInfo.email.changed &&
        !userInfo.newPw.changed &&
        (!isNameValid(userInfo.username.value) ||
          !isEmailValid(userInfo.email.value) ||
          !isPwValid(userInfo.newPw.value)),
    },
    actions: {
      onSubmit,
      setUserInfo,
    },
  };
};
