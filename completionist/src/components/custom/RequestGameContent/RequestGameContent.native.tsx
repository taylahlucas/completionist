import React from 'react';
import { Pressable } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { RequestGameContentInputContainer, RequestGameSubtitleContainer } from './RequestGameContentStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useEndpoints from '@data/hooks/useEndpoints';
import useMainState from '@redux/hooks/useMainState';

const RequestGameContent = () => {
  const theme = useGetTheme();
  const { user } = useMainState();
  const { sendEmail } = useEndpoints();

  const sendEmailAction = () => {
    sendEmail({
      from: user.email,
      subject: 'TestSubject',
      text: 'Email Body Content'
    })
  };
  // TODO: Add button to enable/disable DLC
  return (
    <>
      <RequestGameSubtitleContainer>
        <StyledText type={'ListItemSubTitle'}>Feel free to request a game, report a bug or make some suggestions to improve the app!</StyledText>
      </RequestGameSubtitleContainer>
      <RequestGameContentInputContainer color={theme.darkGrey} />
      <RequestGameSubtitleContainer>
        <Pressable onPress={sendEmailAction}>
          <StyledText>Send Email</StyledText>
        </Pressable>
      </RequestGameSubtitleContainer>
    </>
  );
};

export default RequestGameContent;