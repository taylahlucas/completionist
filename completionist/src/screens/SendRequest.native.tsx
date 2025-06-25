import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/navigation-header';
import StyledText from '@components/general/Text/StyledText.native';
import { sendEmail } from '@data/api/endpoints';
import { useMainState } from '@redux/hooks';
import Button from '@components/general/Button/Button.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import { KeyboardAvoidingScrollView } from '@components/general/Lists/index';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import { ParagraphView } from '@components/general/index';

interface RequestFormData {
  subject: string;
  text: string;
}

const SendRequest = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const [formData, setFormData] = useState<RequestFormData>({
    subject: '',
    text: '',
  });

  const sendEmailAction = () => {
    sendEmail({
      emailTo: user.email,
      subject: formData.subject,
      text: formData.text,
    }).then(() => {
      setFormData({ subject: '', text: '' });
      Alert.alert('Thanks!', 'Your email has been sent successfully.');
    });
  };

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.SendRequest}
        title={t('common:screens.sendRequest')}
      />
      <ParagraphView>
        <StyledText>{t('common:sendRequest.requestGameDesc')}</StyledText>
      </ParagraphView>
      <KeyboardAvoidingScrollView
        awareView={
          <Button
            title={t('common:screens.sendRequest')}
            type="footer"
            onPress={sendEmailAction}
            disabled={!formData.subject || !formData.text}
          />
        }>
        <TextInput
          placeholder={t('common:sendRequest.subject')}
          value={formData.subject}
          onChangeText={(value: string) =>
            setFormData({
              ...formData,
              subject: value,
            })
          }
          onReset={(): void =>
            setFormData({
              ...formData,
              subject: '',
            })
          }
        />
        <TextInput
          placeholder={t('common:sendRequest.writeRequest')}
          value={formData.text}
          height={200}
          onChangeText={(value: string) =>
            setFormData({
              ...formData,
              text: value,
            })
          }
          onReset={(): void =>
            setFormData({
              ...formData,
              text: '',
            })
          }
          multiline
        />
      </KeyboardAvoidingScrollView>
    </StandardLayout>
  );
};

export default SendRequest;
