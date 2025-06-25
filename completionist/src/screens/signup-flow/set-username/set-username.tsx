import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { NavigationHeader } from '@navigation/index';
import { UnauthorizedScreenEnum } from '@utils/custom-enums';
import TextInput from '@components/general/TextInput/TextInput.native';
import { KeyboardAvoidingScrollView } from '@components/general/Lists/index';
import Button from '@components/general/button/button';
import StyledText from '@components/general/Text/StyledText.native';
import { Spacing } from '@components/general/index';
import { useSetUsername } from './hooks/use-set-username';

export const SetUsername = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useSetUsername();

  const renderAwareView = () => (
    <Button
      title={t('common:continue')}
      type="footer"
      disabled={viewModel.username.length === 0}
      onPress={async (): Promise<void> => {
        if (viewModel.username.length > 0) {
          const updatedUser = {
            ...viewModel.user,
            username: viewModel.username,
            signup: {
              ...viewModel.user.signup,
              setUsername: true,
            },
          };
          actions.updateUserData(updatedUser);
        }
      }}
    />
  );

  return (
    <StandardLayout>
      <NavigationHeader
        id={UnauthorizedScreenEnum.SetUsername}
        title={t('common:setUsername.title')}
        leftAction="none"
      />
      <KeyboardAvoidingScrollView awareView={renderAwareView()}>
        <StyledText>{t('common:setUsername.desc')}</StyledText>
        <Spacing />
        <TextInput
          testID="username"
          placeholder={t('common:auth.username')}
          value={viewModel.username}
          onChangeText={value => actions.setUsername(value)}
          onReset={(): void => actions.setUsername('')}
        />
      </KeyboardAvoidingScrollView>
    </StandardLayout>
  );
};
