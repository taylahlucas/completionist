import React, { ReactNode } from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { StandardLayoutContainer } from './layout-styled-components';
import { Loading } from '@components/general';

interface StandardLayoutProps {
  testID?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export const StandardLayout = ({
  testID,
  children,
  isLoading = false,
}: StandardLayoutProps) => {
  const theme = useGetTheme();

  return (
    <StandardLayoutContainer testID={testID} color={theme.black}>
      {children}
      {isLoading ? <Loading /> : <></>}
    </StandardLayoutContainer>
  );
};
