import { useEffect } from 'react';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const usePlaySplashScreen = () => {
  const { setShowSplashScreen } = useMainDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, [])
};

export default usePlaySplashScreen;