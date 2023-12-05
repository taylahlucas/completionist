import { View, Pressable }from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import Icon from '@components/general/Icon/Icon.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';

interface NavigationHeaderProps {
  title: string;
}

const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  
  return (
    <View style={{ marginTop: 32, width: '100%', flexDirection: 'row' }}>
      <Pressable 
        onPress={(): void => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ alignItems: 'center', position: 'absolute', marginLeft: 16, zIndex: 2 }}
      >
        <Icon 
          style={{ position: 'absolute', zIndex: 1 }}
          name={'menu-sharp'} 
          type={IconTypeEnum.Ionicons} 
          size={40}
        />
        <View style={{ width: 40, height: 40, backgroundColor: theme.lightPurple, borderRadius: 10 }} />
      </Pressable>
      <StyledText style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>{title}</StyledText>
    </View>
  );
};

export default NavigationHeader;