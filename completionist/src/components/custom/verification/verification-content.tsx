import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@components/general/button/button';
import VerificationEntry from '@components/general/VerificationEntry/VerificationEntry.native';
import StyledText from '@components/general/text/styled-text';
import { KeyboardAvoidingScrollView } from '@components/general/lists';
import { ParagraphView } from '@components/general';
import { Spacing } from '@components/general/index';
import { VERIFICATION_ENTRY_LENGTH } from '@utils/index';
import { useSendVerificationEmail } from '../login-form/hooks';

interface VerificationContentProps {
  email: string;
  token: string;
  action: () => void | Promise<void>;
}

export const VerificationContent = ({
  email,
  token,
  action,
}: VerificationContentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const sendVerification = useSendVerificationEmail();

  return (
    <>
      <ParagraphView>
        <StyledText>{t('common:login.accountVerification')}</StyledText>
      </ParagraphView>
      <KeyboardAvoidingScrollView
        awareView={
          <Button
            title={t('common:continue')}
            type="footer"
            disabled={value.length !== token?.length}
            onPress={(): void => {
              if (value === token) {
                action();
              } else {
                Alert.alert(
                  t('common:errors.incorrectCode'),
                  t('common:errors.incorrectCodeDesc'),
                );
              }
            }}
          />
        }>
        <VerificationEntry
          length={VERIFICATION_ENTRY_LENGTH}
          value={value}
          setValue={setValue}
        />
        <Spacing />
        <ParagraphView>
          <Button
            title={t('common:login.resendToken')}
            type="text"
            onPress={(): void => {
              sendVerification(email, 'common:sendRequest.verifyAccount');
              setValue('');
              Alert.alert('common:login.tokenResent');
            }}
          />
        </ParagraphView>
      </KeyboardAvoidingScrollView>
    </>
  );
};
