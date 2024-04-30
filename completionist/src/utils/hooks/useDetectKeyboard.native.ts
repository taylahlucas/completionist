import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

const useDetectKeyboard = () => {
	const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

	useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

	return isKeyboardVisible;
};

export default useDetectKeyboard;