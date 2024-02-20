import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestGameContainer } from './RequestGameContentStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import TextInput from '@components/general/TextInput/TextInput.native';

interface RequestFormData {
  subject: string;
  text: string;
}

const RequestGameContent = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const { sendEmail } = useEndpoints();
  const [formData, setFormData] = useState<RequestFormData>({
    subject: '',
    text: ''
  });


  const sendEmailAction = () => {
    sendEmail({
      from: user.email,
      subject:  formData.subject,
      text: formData.text
    })
  };

  return (
    <>
      <RequestGameContainer>
        <StyledText>{t('common:sendRequest.requestGameDesc')}</StyledText>
      </RequestGameContainer>
      <TextInput
        placeholder={t('common:sendRequest.subject')}
        value={formData.subject}
        onChangeText={(value: string) => setFormData({
          ...formData,
          subject: value
        })}
        onReset={(): void => setFormData({
          ...formData,
          subject: ''
        })}
      />
      <TextInput
        placeholder={t('common:sendRequest.writeRequest')}
        value={formData.text}
        height={200}
        onChangeText={(value: string) => setFormData({
          ...formData,
          text: value
        })}
        onReset={(): void => setFormData({
          ...formData,
          text: ''
        })}
        multiline
      />
      <RequestGameContainer>
        <Button title={t('common:screens.sendRequest')} onPress={sendEmailAction} disabled={!formData.subject || !formData.text} />
      </RequestGameContainer>
    </>
  );
};

export default RequestGameContent;