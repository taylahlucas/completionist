import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput,
  Button,
  StyledText,
  Spacing,
  KeyboardAvoidingScrollView,
} from '@components/general';
import { useSetUsername } from './hooks';

export const SetUsernameContent = () => {
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
  );
};
