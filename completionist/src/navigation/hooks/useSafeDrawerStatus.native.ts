import { useContext } from 'react';
import { DrawerStatusContext } from '@react-navigation/drawer';
import { DrawerStatus } from '@react-navigation/native';

const useSafeDrawerStatus = (): DrawerStatus | undefined => {
  const context = useContext(DrawerStatusContext);

  if (!context) {
    return undefined;
  }

  return context;
};

export default useSafeDrawerStatus;