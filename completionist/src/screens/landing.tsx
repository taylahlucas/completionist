import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import { StandardLayoutContainer } from '@components/general/layouts/standard-layout-styled-components';
import { LoadingAnimation } from '@components/animations';

export const Landing = () => {
  const theme = useGetTheme();
  const animationRef = useRef<LottieView>(null);

  return (
    <StandardLayoutContainer color={theme.black}>
      <LoadingAnimation ref={animationRef} source={''} />
    </StandardLayoutContainer>
  );
};
