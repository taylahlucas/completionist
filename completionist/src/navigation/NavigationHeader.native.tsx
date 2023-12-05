import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  NavigationHeaderContainer, 
  NavigationHeaderMenuButton, 
  NavigationHeaderMenuIcon,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderText
} from './NavigationStyledComponents.native';

interface NavigationHeaderProps {
  title: string;
}

const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  
  return (
    <NavigationHeaderContainer>
      <NavigationHeaderMenuButton 
        onPress={(): void => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <NavigationHeaderMenuIcon 
          style={{ position: 'absolute', zIndex: 1 }}
          name={'menu-sharp'} 
          type={IconTypeEnum.Ionicons} 
          size={40}
        />
        <NavigationHeaderMenuButtonBg color={theme.lightPurple} />
      </NavigationHeaderMenuButton>
      <NavigationHeaderText>{title}</NavigationHeaderText>
      </NavigationHeaderContainer>
  );
};

export default NavigationHeader;