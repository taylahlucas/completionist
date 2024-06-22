import { useRef, useCallback } from 'react';
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
			if (screenName !== 'DrawerStack') {
				setCurrentScreen(screenName as ScreenEnum);
			}
    }, [screenName])
  );

	const safeNavigation = (page: ScreenEnum, params?: any) => {
		if (navigation.getState()?.routeNames?.length > 0) {
			// TODO: Not sure why this is failing?
			navigation.navigate(page, params);
		}
	};

  return useRef({
    navigate: (page: ScreenEnum, params?: any): void => safeNavigation(page, params),
    dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)): void => navigation.dispatch(action),
    goBack: (): void => navigation.goBack(),
    setOptions: (options: any): void => navigation.setOptions(options)
  }).current;
};

export default useReactNavigation;