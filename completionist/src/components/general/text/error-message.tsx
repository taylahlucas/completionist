import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import { StyledText } from '@components/general';

interface ErrorMessageProps {
  children: string;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  const theme = useGetTheme();

  return (
    <View style={{ paddingLeft: 16, paddingRight: 16 }}>
      <StyledText align="left" color={theme.error}>
        {children}
      </StyledText>
    </View>
  );
};
