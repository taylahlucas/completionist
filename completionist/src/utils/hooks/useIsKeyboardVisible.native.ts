import { useEffect, useState } from 'react';
import { Platform, Keyboard, KeyboardEvent } from 'react-native';

const useIsKeyboardVisible = (): boolean => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = (event: KeyboardEvent): void => {
    setKeyboardVisible(true);
  };

  const handleKeyboardDidHide = (): void => {
    setKeyboardVisible(false);
  };

  return isKeyboardVisible;
};

export default useIsKeyboardVisible;
