import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { StandardLayoutContainer } from './standard-layout-styled-components';
import { Loading } from '@components/general';

interface StandardLayoutProps {
  children: any;
  isLoading?: boolean;
}

export const StandardLayout = ({
  children,
  isLoading = false,
}: StandardLayoutProps) => {
  const theme = useGetTheme();

  return (
    <StandardLayoutContainer color={theme.black}>
      {children}
      {isLoading ? <Loading /> : <></>}
    </StandardLayoutContainer>
  );
};
