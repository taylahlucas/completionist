import React, { useRef } from 'react';
import { View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LottieView from 'lottie-react-native';

const Landing = () => {
  const animationRef = useRef<LottieView>(null);

  return (
    <StandardLayout>
      <View style={{ height: '90%', justifyContent: 'center', alignSelf: 'center' }}>
        <LottieView
          ref={animationRef}
          style={{ width: 150, height: 150 }}
          source={require('../styles/animations/tick.json')}
          autoPlay
          loop
        />
      </View>
    </StandardLayout>
  );
};

export default Landing;