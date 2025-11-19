import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput,
  Button,
  StyledText,
  Spacing,
  KeyboardAvoidingScrollView,
} from '@components/general';
import { useEditUserData } from '@data/hooks';
import { useAuthUser } from '@redux/auth';

export const SetUsernameContent = () => {
  const { t } = useTranslation();
  const user = useAuthUser();
  const [username, setUsername] = useState<string>('');
  const { updateUserData } = useEditUserData();

  const renderAwareView = () => (
    <Button
      title={t('common:continue')}
      type="footer"
      disabled={username.length === 0}
      onPress={async (): Promise<void> => {
        if (username.length > 0) {
          const updatedUser = {
            ...user,
            username: username,
            signup: {
              ...user.signup,
              setUsername: true,
            },
          };
          updateUserData(updatedUser);
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
        value={username}
        onChangeText={value => setUsername(value)}
        onReset={(): void => setUsername('')}
      />
    </KeyboardAvoidingScrollView>
  );
};
