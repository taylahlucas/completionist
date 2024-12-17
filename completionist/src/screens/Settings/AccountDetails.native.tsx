import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AccountDetailsFieldTitle } from '@components/custom/Settings/SettingsStyledComponents.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import Button from '@components/general/Button/Button.native';
import { Condition } from '@components/general/index';
import { KeyboardAvoidingScrollView } from '@components/general/Lists/index';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import ErrorMessage from '@components/general/Text/ErrorMessage.native';
import StyledText from '@components/general/Text/StyledText.native';
import useAccountDetails from './hooks/useAccountDetails';

const AccountDetails = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useAccountDetails();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.AccountDetails}
        title={t('common:screens.accountDetails')}
        isForm={
          viewModel.userInfo.username.changed ||
          viewModel.userInfo.email.changed
        }
        leftAction="back"
      />
      <>
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
            <ErrorMessage>
              {t('common:accountDetails.invalidEmail')}
            </ErrorMessage>
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
      </>
    </StandardLayout>
  );
};

export default AccountDetails;
