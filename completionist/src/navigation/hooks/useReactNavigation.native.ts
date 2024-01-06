import { useRef, useCallback, useState } from 'react';
import { DrawerActions as RNDrawerActions, ParamListBase } from '@react-navigation/routers';
import { NavigationAction, NavigationState, useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { NativeNavigation } from '@utils/CustomInterfaces';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainDispatch from '@redux/hooks/useMainDispatch';

export const DrawerActions = RNDrawerActions;

export const useReactNavigation = (): NativeNavigation => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const screenName = useNavigationState((state) => state?.routes[state?.index].name); 
  const { setCurrentScreen } = useMainDispatch();
  
  useFocusEffect(
    useCallback(() => {
      console.log("HERE")
      setCurrentScreen(screenName as ScreenEnum);
      // This effect runs when the component is focused
      // Update the screenName whenever the focus changes
      // (i.e., when navigating to a different screen)
      return () => {
        // Cleanup if needed
      };
    }, [screenName])
  );

  return useRef({
    navigate: (page: ScreenEnum, params?: any): void => navigation.navigate(page, params),
    dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)): void => navigation.dispatch(action),
    getCurrentScreenName: (): ScreenEnum | null => screenName as ScreenEnum,
    goBack: (): void => navigation.goBack(),
    setOptions: (options: any): void => navigation.setOptions(options)
  }).current;
};

export default useReactNavigation;