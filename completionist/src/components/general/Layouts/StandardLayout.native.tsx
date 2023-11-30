import React from 'react';
import { StandardLayoutContainer } from './StandardLayoutStyledComponents.native';

interface StandardLayoutProps {
  children: any;
}

const StandardLayout = ({ children }: StandardLayoutProps) => {

  return (
    <StandardLayoutContainer>
      {children}
    </StandardLayoutContainer>
  );
};

export default StandardLayout;