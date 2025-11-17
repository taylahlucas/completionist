import { useRef, useCallback } from 'react';
import {
  DrawerActions as RNDrawerActions,
  ParamListBase,
} from '@react-navigation/native';
import {
  NavigationAction,
  NavigationState,
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  NativeNavigation,
  ScreenEnumType,
  NavigatorParams,
} from '@utils/index';
import { useMainDispatch } from '@redux/hooks';

export const DrawerActions = RNDrawerActions;

export const useReactNavigation = (): NativeNavigation => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const screenName = useNavigationState(
    state => state?.routes[state?.index].name,
  );
  const { setCurrentScreen } = useMainDispatch();

  useFocusEffect(
    useCallback(() => {
      if (screenName !== 'DrawerStack') {
        setCurrentScreen(screenName as ScreenEnumType);
      }
    }, [screenName]),
  );

  const safeNavigation = (
    page: ScreenEnumType,
    params?: NavigatorParams[ScreenEnumType],
  ) => {
    navigation.navigate(page as any, params);
    // if (navigation.getState()?.routeNames?.length > 0) {
    //   navigation.navigate(page as any, params);
    // }
  };

  return useRef({
    navigate: (
      page: ScreenEnumType,
      params?: NavigatorParams[ScreenEnumType],
    ): void => safeNavigation(page, params),
    dispatch: (
      action: NavigationAction | ((state: NavigationState) => NavigationAction),
    ): void => navigation.dispatch(action),
    goBack: (): void => navigation.goBack(),
    setOptions: (options: any): void => navigation.setOptions(options),
  }).current;
};
