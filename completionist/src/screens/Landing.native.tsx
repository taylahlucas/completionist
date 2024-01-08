import React, { useRef } from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import LottieView from 'lottie-react-native';

const Landing = () => {
  const theme = useGetTheme();
  const animationRef = useRef<LottieView>(null);

  return (
    <StandardLayout>
      <StyledText style={{ marginTop: 32 }} color={theme.lightestGrey}>Completionist.</StyledText>
      <LottieView
        ref={animationRef}
        style={{ width: 100, height: 100 }}
        source={require('../../../animations/tick.json')}
        autoPlay={false}
        loop={false}
      />
    </StandardLayout>
  );
};

export default Landing;