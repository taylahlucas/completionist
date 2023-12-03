import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ScreenEnum } from '@utils/CustomEnums';
import useDefaultHeaderOptions from './hooks/useDefaultHeaderOptions.native';
import BottomTabNavigatorTabBar from './BottomTabNavigatorTabBar.native';
import useGetTabList from './hooks/useGetTabList.native';

const Tab = createBottomTabNavigator();

const BottomNavigator: React.FunctionComponent = (): JSX.Element => {
  const headerOptions = useDefaultHeaderOptions();
  const tabList = useGetTabList();
  
  // TODO: Add active icon
  return (
    <Tab.Navigator 
      initialRouteName={ScreenEnum.Quests} 
      screenOptions={headerOptions}
      tabBar={(props: BottomTabBarProps): JSX.Element => <BottomTabNavigatorTabBar {...props} />}
    >
      {tabList.map(tab =>
        <Tab.Screen
          key={tab.id}
          name={tab.title}
          component={tab.screen}
          initialParams={{
            id: tab.id,
            // icon: tab.icon,
            // iconType: tab.iconType
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomNavigator;