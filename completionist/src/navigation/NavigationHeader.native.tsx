import { View, Pressable }from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';

interface NavigationHeaderProps {
  title: string;
}

const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  const navigation = useReactNavigation();
  
  return (
    <View style={{ marginTop: 32, width: '100%', flexDirection: 'row' }}>
      <Pressable 
        onPress={(): void => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ alignItems: 'center', position: 'absolute', marginLeft: 16, zIndex: 1 }}
      >
        <View style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 10 }} />
      </Pressable>
      <StyledText style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>{title}</StyledText>
    </View>
  );
};

export default NavigationHeader;