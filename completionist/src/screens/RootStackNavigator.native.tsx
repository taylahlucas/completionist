import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import Login from './Login.native';
import Quests from './Quests.native';
import useUploadData from '@data/hooks/useUploadData';

const RootStackNavigator = () => {
  const { loggedIn } = useMainState();
  const appState = useRef(AppState.currentState);
  const { uploadData } = useUploadData();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // Read data
      }
      else if (nextAppState === 'inactive') {
        uploadData();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
  
  return (
    <Condition 
      condition={loggedIn}
      conditionalElement={<Login />}
    >
      <Quests />
    </Condition>
  );
};

export default RootStackNavigator;