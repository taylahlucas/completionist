import React, { useRef } from 'react';
import { View } from 'react-native';

interface OverlayProps {
  children: any;
}

export const Overlay = ({ children }: OverlayProps) => {
  // TODO: Test on larger iPhone screens
  return (
    <View
      style={{
        height: '105%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}>
      {children}
    </View>
  );
};
