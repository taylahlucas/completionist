import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import StyledText from '@components/general/Text/StyledText.native';

interface ErrorMessageProps {
  children: string;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  const theme = useGetTheme();

  return (
    <View style={{ paddingLeft: 16, paddingRight: 16 }}>
      <StyledText align="left" color={theme.error}>
        {children}
      </StyledText>
    </View>
  );
};

export default ErrorMessage;
