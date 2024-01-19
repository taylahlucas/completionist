import React, { useState } from 'react';
import { RequestGameContainer } from './RequestGameContentStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useEndpoints from '@data/hooks/useEndpoints';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import TextInput from '@components/general/TextInput/TextInput.native';

interface RequestFormData {
  subject: string;
  text: string;
}

const RequestGameContent = () => {
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
        <StyledText>Feel free to request a game, report a bug or make some suggestions to improve the app!</StyledText>
      </RequestGameContainer>
      <TextInput
        placeholder={'Subject'}
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
        placeholder={'Write your request here...'}
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
        multiline={true}
      />
      <RequestGameContainer>
        <Button title={'Send Request'} onPress={sendEmailAction} disabled={!formData.subject || !formData.text} />
      </RequestGameContainer>
    </>
  );
};

export default RequestGameContent;