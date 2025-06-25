import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { isIos } from '@utils/device';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onKeyboardWillShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showListener = Keyboard.addListener(
      isIos() ? 'keyboardWillShow' : 'keyboardDidShow',
      onKeyboardWillShow,
    );

    const hideListener = Keyboard.addListener(
      isIos() ? 'keyboardWillHide' : 'keyboardDidHide',
      onKeyboardWillHide,
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;
