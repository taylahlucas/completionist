import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';

export const Seperator = () => {
  const theme = useGetTheme();

  return (
    <View
      style={{
        height: 1,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: theme.darkGrey,
      }}
    />
  );
};
