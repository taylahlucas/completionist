import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import Quests from './Quests.native';
import useCreateOrGetUser from '@components/custom/LoginForm/hooks/useCreateOrGetUser';
import Login from './Login.native';
import useEndpoints from '@data/hooks/useEndpoints';
import { Item, User, UserData, UserFormData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from '@data/hooks/useKeychain.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

const RootStackNavigator = () => {
  const { 
    isLoggedIn, 
    userFormData,
    completedQuestIds,
    completedCollectableIds,
    completedLocationIds,
    completedBookIds
  } = useMainState();
  const appState = useRef(AppState.currentState);
  const { setUserFormData, setLoggedIn } = useMainDispatch();
  const { getUserByUserId, updateUserData } = useEndpoints();
  const { getCredentials, checkIfCredentialsExist } = useKeychain();

  useCreateOrGetUser();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // App opening, read data
      if (nextAppState === 'active') {
        getCredentials()
          .then((response) => {
            if (!!response?.password) {
              const exists = checkIfCredentialsExist(response?.password);
              if (exists) {
                getUserByUserId({ userId: response?.password });
              }
            }
          })
      }
      // App closing, upload data
      else if (nextAppState === 'inactive' && isLoggedIn) {
        console.log("UPDATING USER: ", userFormData.userId)
        const quests: Item[] = completedQuestIds.map(id => ({ id, isComplete: true }));
        const collectables: Item[] = completedCollectableIds.map(id => ({ id, isComplete: true }));
        const locations: Item[] = completedLocationIds.map(id => ({ id, isComplete: true }));
        const miscellaneous: Item[] = completedBookIds.map(id => ({ id, isComplete: true }));

        updateUserData({
          userId: userFormData.userId,
          skyrimData: {
            quests: quests,
            collectables: collectables,
            locations: locations,
            miscellaneous: miscellaneous
          }
        });
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
  
  return (
    <Condition 
      condition={isLoggedIn}
      conditionalElement={<Login />}
    >
      <Quests />
    </Condition>
  );
};

export default RootStackNavigator;