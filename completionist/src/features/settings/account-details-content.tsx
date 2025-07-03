import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StandardLayout,
  TextInput,
  Button,
  ErrorMessage,
  StyledText,
  Condition,
  KeyboardAvoidingScrollView,
} from '@components/general';
import { useAccountDetails } from '../../features/settings/hooks';
import { AccountDetailsFieldTitle } from '@components/custom';

export const AccountDetailsContent = ({
  setIsForm,
}: {
  setIsForm: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { viewModel, actions } = useAccountDetails();

  useEffect(() => {
    setIsForm(viewModel.hasChanged);
  }, [viewModel.hasChanged]);

  return (
    <KeyboardAvoidingScrollView
      awareView={
        <Button
          title={t('common:accountDetails.updateDetails')}
          type="footer"
          disabled={viewModel.submitDisabled}
          onPress={actions.onSubmit}
        />
      }>
      <AccountDetailsFieldTitle align="left">
        {t('common:accountDetails.changeUsername')}
      </AccountDetailsFieldTitle>
      <TextInput
        placeholder={t('common:auth.username')}
        value={viewModel.userInfo.username.value}
        inputStyle="text"
        onChangeText={(value: string): void =>
          actions.setUserInfo({
            ...viewModel.userInfo,
            username: {
              value: value,
              changed: value !== viewModel.user.username,
            },
          })
        }
        onReset={(): void =>
          actions.setUserInfo({
            ...viewModel.userInfo,
            username: { value: '', changed: true },
          })
        }
      />
      <Condition condition={viewModel.isNameValid}>
        <ErrorMessage>
          {t('common:accountDetails.invalidUsername')}
        </ErrorMessage>
      </Condition>

      <AccountDetailsFieldTitle align="left">
        {t('common:accountDetails.changeEmail')}
      </AccountDetailsFieldTitle>
      <TextInput
        placeholder={t('common:auth.email')}
        value={viewModel.userInfo.email.value.toLowerCase()}
        inputStyle="text"
        onChangeText={(value: string): void =>
          actions.setUserInfo({
            ...viewModel.userInfo,
            email: {
              value: value,
              changed: value !== viewModel.user.email,
            },
          })
        }
        onReset={(): void =>
          actions.setUserInfo({
            ...viewModel.userInfo,
            email: { value: '', changed: true },
          })
        }
      />
      <Condition condition={viewModel.isEmailValid}>
        <ErrorMessage>{t('common:accountDetails.invalidEmail')}</ErrorMessage>
      </Condition>

      <Condition condition={viewModel.showChangePw}>
        <StyledText
          align="left"
          style={{ width: '100%', paddingTop: 18, paddingBottom: 8 }}
          type="ListItemTitleBold">
          {t('common:accountDetails.changePw')}
        </StyledText>
        <TextInput
          placeholder={t('common:accountDetails.currentPw')}
          value={viewModel.userInfo.currentPw.value}
          secureTextEntry
          inputStyle="text"
          onChangeText={(value: string): void =>
            actions.setUserInfo({
              ...viewModel.userInfo,
              currentPw: {
                value: value,
                changed: value !== viewModel.user.pw,
              },
            })
          }
          onReset={(): void =>
            actions.setUserInfo({
              ...viewModel.userInfo,
              currentPw: { value: '', changed: false },
            })
          }
        />
        <TextInput
          placeholder={t('common:accountDetails.newPw')}
          value={viewModel.userInfo.newPw.value}
          secureTextEntry
          inputStyle="text"
          onChangeText={(value: string): void =>
            actions.setUserInfo({
              ...viewModel.userInfo,
              newPw: { value: value, changed: value !== viewModel.user.pw },
            })
          }
          onReset={(): void =>
            actions.setUserInfo({
              ...viewModel.userInfo,
              newPw: { value: '', changed: false },
            })
          }
        />

        <Condition condition={viewModel.isPwValid}>
          <ErrorMessage>{`${t('common:login.instructions1')}${t(
            'common:login.instructions2',
          )}`}</ErrorMessage>
        </Condition>
      </Condition>
    </KeyboardAvoidingScrollView>
  );
};
