import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { StandardLayoutContainer } from './StandardLayoutStyledComponents.native';
import { View } from 'react-native';

interface StandardLayoutProps {
  children: any;
}

const StandardLayout = ({ children }: StandardLayoutProps) => {
  const theme = useGetTheme();

  return (
    <StandardLayoutContainer color={theme.black}>
			<View style={{ padding: 8 }}>
      	{children}
			</View>
    </StandardLayoutContainer>
  );
};

export default StandardLayout;