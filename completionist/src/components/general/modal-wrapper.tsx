import React, { useRef, useEffect } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import { windowHeight } from '@styles/global';

interface ModalWrapperProps {
  children: any;
}

export const ModalWrapper = ({ children }: ModalWrapperProps) => {
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  const theme = useGetTheme();

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal transparent animationType="none">
      <View style={{ ...styles.overlay, backgroundColor: 'black' }}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY }], backgroundColor: theme.black },
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    padding: 20,
    height: windowHeight,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
